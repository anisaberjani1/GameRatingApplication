using AutoMapper;
using GameReviewAPI.DTOs;
using GameReviewAPI.Helpers;
using GameReviewAPI;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GameReviewAPI.Entities;

namespace GameReviewAPI.Controllers
{
    [ApiController]
    [Route("api/shops")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "IsAdmin")]
    public class ShopsController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public ShopsController(ApplicationDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<ShopDTO>>> Get([FromQuery] PaginationDTO paginationDTO)
        {
            var queryable = context.Shops.AsQueryable();
            await HttpContext.InsertParametersPaginationInHeader(queryable);
            var entities = await queryable.OrderBy(x => x.Name).Paginate(paginationDTO).ToListAsync();
            return mapper.Map<List<ShopDTO>>(entities);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<ShopDTO>> Get(int id)
        {
            var movieTheater = await context.Shops.FirstOrDefaultAsync(x => x.Id == id);

            if (movieTheater == null)
            {
                return NotFound();
            }

            return mapper.Map<ShopDTO>(movieTheater);
        }

        [HttpPost]
        public async Task<ActionResult> Post(ShopCreationDTO shopCreationDTO)
        {
            var movieTheater = mapper.Map<Shop>(shopCreationDTO);
            context.Add(movieTheater);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, ShopCreationDTO shopCreationDTO)
        {
            var movieTheater = await context.Shops.FirstOrDefaultAsync(x => x.Id == id);

            if (movieTheater == null)
            {
                return NotFound();
            }

            movieTheater = mapper.Map(shopCreationDTO, movieTheater);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var movieTheater = await context.Shops.FirstOrDefaultAsync(x => x.Id == id);

            if (movieTheater == null)
            {
                return NotFound();
            }

            context.Remove(movieTheater);
            await context.SaveChangesAsync();
            return NoContent();
        }
    }
}