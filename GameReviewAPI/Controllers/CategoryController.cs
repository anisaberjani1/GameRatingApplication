using AutoMapper;
using GameReviewAPI.DTOs;
using GameReviewAPI.Entities;
using GameReviewAPI.Filters;
using GameReviewAPI.Helpers;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;

namespace GameReviewAPI.Controllers
{
    [Route("api/category")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "IsAdmin")]
    public class CategoryController : ControllerBase
    {
        private readonly ILogger<CategoryController> logger;
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public CategoryController( ILogger<CategoryController> logger, ApplicationDbContext context
            , IMapper mapper)
        {
            this.logger = logger;
            this.context = context;
            this.mapper = mapper;
        }

        [HttpGet]//api/category
        public async Task<ActionResult<List<CategoryDTO>>> Get([FromQuery] PaginationDTO paginationDTO)
        {
            var queryable = context.Categories.AsQueryable();

            await HttpContext.InsertParametersPaginationInHeader(queryable);

            var categories = await queryable.OrderBy(x => x.Name).Paginate(paginationDTO).ToListAsync();

            return mapper.Map<List<CategoryDTO>>(categories);   
            
        }

        [HttpGet("all")]//api/category
        [AllowAnonymous]
        public async Task<ActionResult<List<CategoryDTO>>> Get()
        {

            var categories = await context.Categories.OrderBy(x => x.Name).ToListAsync();

            return mapper.Map<List<CategoryDTO>>(categories);

        }



        [HttpGet("{Id:int}")]
        public async Task<ActionResult<CategoryDTO>> Get(int id)
        {
            var category = await context.Categories.FirstOrDefaultAsync(x => x.Id == id);

            if(category == null)
            {
                return NotFound();
            }

            return mapper.Map<CategoryDTO>(category);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody]CategoryCreationDTO categoryCreationDTO)
        {
            var category = mapper.Map<Category>(categoryCreationDTO);
            context.Add(category);
            await context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id,[FromBody] CategoryCreationDTO categoryCreationDTO)
        {
            var category = await context.Categories.FirstOrDefaultAsync(x => x.Id == id);
            
            if(category == null)
            {
                return NotFound();
            }

            category = mapper.Map(categoryCreationDTO, category);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var category = await context.Categories.FirstOrDefaultAsync(x => x.Id == id);

            if (category == null)
            {
                return NotFound();
            }

            context.Remove(category);
            await context.SaveChangesAsync();
            return NoContent();
        }

    }
}
