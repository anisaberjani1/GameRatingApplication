using GameReviewAPI.DTOs;
using GameReviewAPI.Entities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GameReviewAPI.Controllers
{
    [ApiController]
    [Route("api/ratings")]
    public class RatingsController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly UserManager<IdentityUser> userManager;

        public RatingsController(ApplicationDbContext context, UserManager<IdentityUser> userManager)
        {
            this.context = context;
            this.userManager = userManager;
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult> Post([FromBody] RatingDTO ratingDTO)
        {
            
            var email = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "email").Value;

            var user = await userManager.FindByEmailAsync(email);

            var userId = user.Id;

            var currentRate = await context.Ratings
                .FirstOrDefaultAsync(x => x.GameId == ratingDTO.GameId &&
                x.UserId == userId);

            if(currentRate == null)
            {
                var rating = new Rating();
                rating.GameId = ratingDTO.GameId;
                rating.Rate = ratingDTO.Rating;
                rating.UserId = userId;
                context.Add(rating);
            }
            else
            {
                currentRate.Rate = ratingDTO.Rating;
            }

            await context.SaveChangesAsync();
            return NoContent();

        }
        


    }
}
