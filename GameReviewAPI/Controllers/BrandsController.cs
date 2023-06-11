using AutoMapper;
using GameReviewAPI.DTOs;
using GameReviewAPI.Entities;
using GameReviewAPI.Helpers;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GameReviewAPI.Controllers
{
    [Route("api/brands")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "IsAdmin")]
    public class BrandsController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;
        private readonly IFileStorageService fileStorageService;
        private readonly string containerName = "brands";

        public BrandsController(ApplicationDbContext context, IMapper mapper,
            IFileStorageService fileStorageService)
        {
            this.context = context;
            this.mapper = mapper;
            this.fileStorageService = fileStorageService;
        }


        [HttpGet]
        public async Task<ActionResult<List<BrandDTO>>> Get([FromQuery] PaginationDTO paginationDTO)
        {
            var queryable = context.Brands.AsQueryable();
            await HttpContext.InsertParametersPaginationInHeader(queryable);

            var brands = await queryable.OrderBy(x=> x.Name).Paginate(paginationDTO).ToListAsync();
            return mapper.Map<List<BrandDTO>>(brands);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<BrandDTO>> Get(int id)
        {
            var brand = await context.Brands.FirstOrDefaultAsync(x => x.Id == id);

            if(brand == null)
            {
                return NotFound();
            }

            return mapper.Map<BrandDTO>(brand);

        }

        [HttpGet("searchByName/{query}")]
        public async Task<ActionResult<List<BrandsGameDTO>>> SearchByName(string query)
        {
            if (string.IsNullOrWhiteSpace(query)) { return new List<BrandsGameDTO>(); }

            return await context.Brands
                .Where(x => x.Name.Contains(query))
                .OrderBy(x => x.Name)
                .Select(x => new BrandsGameDTO { Id = x.Id, Name = x.Name, Picture = x.Picture })
                .Take(5)
                .ToListAsync();
        }


        [HttpPost]
        public async Task<ActionResult> Post([FromForm] BrandCreationDTO brandCreationDTO)
        {
            var brand = mapper.Map<Brand>(brandCreationDTO);

            if(brandCreationDTO.Picture != null)
            {
                brand.Picture = await fileStorageService.SaveFile(containerName, brandCreationDTO.Picture);
            }

            context.Add(brand);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id,[FromForm] BrandCreationDTO brandCreationDTO)
        {
            var brand = await context.Brands.FirstOrDefaultAsync(x => x.Id == id);

            if(brand == null)
            {
                return NotFound();
            }

            brand = mapper.Map(brandCreationDTO, brand);

            if(brandCreationDTO.Picture != null)
            {
                brand.Picture = await fileStorageService.EditFile(containerName,
                    brandCreationDTO.Picture, brand.Picture);
            }

            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var brand = await context.Brands.FirstOrDefaultAsync(x => x.Id == id);

            if (brand == null)
            {
                return NotFound();
            }

            context.Remove(brand);
            await context.SaveChangesAsync();
            await fileStorageService.DeleteFile(brand.Picture, containerName);
            return NoContent();
        }




    }
}
