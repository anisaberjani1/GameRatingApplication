using AutoMapper;
using GameReviewAPI.DTOs;
using GameReviewAPI.Entities;
using GameReviewAPI.Helpers;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GameReviewAPI.Controllers
{
    [Route("api/games")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "IsAdmin")]
    public class GamesController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;
        private readonly IFileStorageService fileStorageService;
        private readonly UserManager<IdentityUser> userManager;
        private string container = "games";

        public GamesController(ApplicationDbContext context, IMapper mapper,
            IFileStorageService fileStorageService, UserManager<IdentityUser> userManager)
        {
            this.context = context;
            this.mapper = mapper;
            this.fileStorageService = fileStorageService;
            this.userManager = userManager;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<LandingPageDTO>> Get()
        {
            var top = 6;
            var today = DateTime.Today;

            var upcomingReleases = await context.Games
                .Where(x => x.ReleaseDate > today)
                .OrderBy(x => x.ReleaseDate)
                .Take(top)
                .ToListAsync();

            var inShops = await context.Games
                .Where(x => x.inShops)
                .OrderBy(x => x.ReleaseDate)
                .Take(top)
                .ToListAsync();

            var landingPageDTO = new LandingPageDTO();

            landingPageDTO.UpcomingReleases = mapper.Map<List<GameDTO>>(upcomingReleases);
            landingPageDTO.InShops = mapper.Map<List<GameDTO>>(inShops);

            return landingPageDTO;
        }

        [HttpGet("PostGet")]
        public async Task<ActionResult<GamePostGetDTO>> PostGet()
        {
            var shops = await context.Shops.OrderBy(x => x.Name).ToListAsync();
            var categories = await context.Categories.OrderBy(x => x.Name).ToListAsync();

            var shopsDTO = mapper.Map<List<ShopDTO>>(shops);
            var categoriesDTO = mapper.Map<List<CategoryDTO>>(categories);

            return new GamePostGetDTO() { Categories = categoriesDTO, Shops = shopsDTO };
        }

        [HttpGet("{id:int}")]
        [AllowAnonymous]
        public async Task<ActionResult<GameDTO>> Get(int id)
        {
            var game = await context.Games
                .Include(x => x.GamesCategories).ThenInclude(x => x.Category)
                .Include(x => x.ShopsGames).ThenInclude(x => x.Shop)
                .Include(x => x.GamesBrands).ThenInclude(x => x.Brand)
                .FirstOrDefaultAsync(x => x.Id == id);

            if(game == null)
            {
                return NotFound();
            }

            var averageVote = 0.0;
            var userVote = 0;

            if(await context.Ratings.AnyAsync(x => x.GameId == id))
            {
                averageVote = await context.Ratings.Where(x => x.GameId == id)
                    .AverageAsync(x => x.Rate);

                if (HttpContext.User.Identity.IsAuthenticated)
                {
                    var email = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "email").Value;
                    var user = await userManager.FindByEmailAsync(email);

                    var userId = user.Id;

                    var ratingDb = await context.Ratings.FirstOrDefaultAsync(x => x.GameId == id &&
                        x.UserId == userId);

                    if(ratingDb != null)
                    {
                        userVote = ratingDb.Rate;
                    }
                }
            }


            var dto = mapper.Map<GameDTO>(game);
            dto.AverageVote = averageVote;
            dto.UserVote = userVote;
            dto.Brands = dto.Brands.ToList();
            return dto;
        }

        

        [HttpGet("filter")]
        [AllowAnonymous]
        public async Task<ActionResult<List<GameDTO>>> Filter([FromQuery]FilterGamesDTO filterGamesDTO)
        {
            var gamesQueryable = context.Games.AsQueryable();

            if (!string.IsNullOrEmpty(filterGamesDTO.Title))
            {
                gamesQueryable = gamesQueryable.Where(x => x.Title.Contains(filterGamesDTO.Title));
            }

            if (filterGamesDTO.InShops)
            {
                gamesQueryable = gamesQueryable.Where(x => x.inShops);
            }

            if (filterGamesDTO.UpcomingReleases)
            {
                var today = DateTime.Today;
                gamesQueryable = gamesQueryable.Where(x => x.ReleaseDate > today);
            }

            if(filterGamesDTO.CategoryId != 0)
            {
                gamesQueryable = gamesQueryable
                    .Where(x => x.GamesCategories.Select(y => y.CategoryId)
                    .Contains(filterGamesDTO.CategoryId));
            }

            await HttpContext.InsertParametersPaginationInHeader(gamesQueryable);
            var games = await gamesQueryable.OrderBy(x => x.Title).Paginate(filterGamesDTO.PaginationDTO).ToListAsync();

            return mapper.Map<List<GameDTO>>(games);
        }


        


        [HttpPost]
        public async Task<ActionResult<int>> Post([FromForm]GameCreationDTO gameCreationDTO)
        {
            var game = mapper.Map<Game>(gameCreationDTO);

            if(gameCreationDTO.Poster != null)
            {
                game.Poster = await fileStorageService.SaveFile(container, gameCreationDTO.Poster);
            }

            context.Add(game);
            await context.SaveChangesAsync();
            return game.Id;

        }

        [HttpGet("putget/{id:int}")]
        public async Task<ActionResult<GamePutGetDTO>> PutGet(int id)
        {
            var gameActionResult = await Get(id);

            if(gameActionResult.Result is NotFoundResult) { return NotFound(); }

            var game = gameActionResult.Value;

            var categoriesSelectedIds = game.Categories.Select(x => x.Id).ToList();
            var nonSelectedCategories = await context.Categories
                .Where(x => !categoriesSelectedIds.Contains(x.Id))
                .ToListAsync();

            var shopsIds = game.Shops.Select(x => x.Id).ToList();
            var nonSelectedShops = await context.Shops
                .Where(x => !shopsIds.Contains(x.Id))
                .ToListAsync();

            var nonSelectedCategoriesDTOs = mapper.Map<List<CategoryDTO>>(nonSelectedCategories);
            var nonSelectedShopsDTOs = mapper.Map<List<ShopDTO>>(nonSelectedShops);

            var response = new GamePutGetDTO();
            response.Game = game;
            response.SelectedCategories = game.Categories;
            response.NonSelectedCategories = nonSelectedCategoriesDTOs;
            response.SelectedShops = game.Shops;
            response.NonSelectedShops = nonSelectedShopsDTOs;
            response.Brands = game.Brands;
            return response;

        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, GameCreationDTO gameCreationDTO)
        {
            var game = await context.Games.Include(x => x.GamesBrands)
                .Include(x => x.GamesCategories)
                .Include(x => x.ShopsGames)
                .FirstOrDefaultAsync(x => x.Id == id);


            if(game == null) { return NotFound(); }

            game = mapper.Map(gameCreationDTO, game);

            if(gameCreationDTO.Poster != null)
            {
                game.Poster = await fileStorageService.EditFile(container, gameCreationDTO.Poster,
                    game.Poster);
            }

            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var game = await context.Games.FirstOrDefaultAsync(x => x.Id == id);

            if(game == null)
            {
                return NotFound();
            }

            context.Remove(game);
            await context.SaveChangesAsync();
            await fileStorageService.DeleteFile(game.Poster, container);
            return NoContent();
        }

        


    }
}
