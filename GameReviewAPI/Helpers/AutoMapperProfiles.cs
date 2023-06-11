using AutoMapper;
using GameReviewAPI.DTOs;
using GameReviewAPI.Entities;
using GameReviewAPI.Migrations;
using Microsoft.AspNetCore.Identity;
using NetTopologySuite.Geometries;

namespace GameReviewAPI.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles(GeometryFactory geometryFactory)
        {
            CreateMap<CategoryDTO, Category>().ReverseMap();
            CreateMap<CategoryCreationDTO, Category>();

            CreateMap<BrandDTO, Brand>().ReverseMap();
            CreateMap<BrandCreationDTO, Brand>()
                .ForMember(x => x.Picture, options => options.Ignore());

            CreateMap<Shop, ShopDTO>()
                .ForMember(x => x.Latitude, dto => dto.MapFrom(prop => prop.Location.Y))
                .ForMember(x => x.Longitude, dto => dto.MapFrom(prop => prop.Location.X));

            CreateMap<ShopCreationDTO, Shop>()
                .ForMember(x => x.Location, x => x.MapFrom(dto =>
                    geometryFactory.CreatePoint(new Coordinate(dto.Longitude, dto.Latitude))));

            CreateMap<GameCreationDTO, Game>()
                .ForMember(x => x.Poster, options => options.Ignore())
                .ForMember(x => x.GamesCategories, options => options.MapFrom(MapGamesCategories))
                .ForMember(x => x.ShopsGames, options => options.MapFrom(MapShopsGames))
                .ForMember(x => x.GamesBrands, options => options.MapFrom(MapGamesBrands));

            CreateMap<Game, GameDTO>()
                .ForMember(x => x.Categories, options => options.MapFrom(MapGamesCategories))
                .ForMember(x => x.Shops, options => options.MapFrom(MapShopsGames))
                .ForMember(x => x.Brands, options => options.MapFrom(MapGamesBrands));

            CreateMap<IdentityUser, UserDTO>();
        }

        private List<BrandsGameDTO> MapGamesBrands(Game game, GameDTO gameDTO)
        {
            var result = new List<BrandsGameDTO>();

            if(game.GamesBrands != null)
            {
                foreach(var gamesBrands in game.GamesBrands)
                {
                    result.Add(new BrandsGameDTO()
                    {
                        Id = gamesBrands.BrandId,
                        Name = gamesBrands.Brand.Name,
                        Company = gamesBrands.Company,
                        Picture = gamesBrands.Brand.Picture,

                    });
                }
            }
            return result;
        }

         private List<ShopDTO> MapShopsGames(Game game, GameDTO gameDTO)
        {
            var result = new List<ShopDTO>();

            if(game.ShopsGames != null)
            {
                foreach(var shopGames in game.ShopsGames)
                {
                    result.Add(new ShopDTO()
                    {
                        Id = shopGames.ShopId,
                        Name = shopGames.Shop.Name,
                        Latitude = shopGames.Shop.Location.Y,
                        Longitude = shopGames.Shop.Location.X
                    });
                }
            }

            return result;
        }

        private List<CategoryDTO> MapGamesCategories(Game game, GameDTO gameDTO)
        {
            var result = new List<CategoryDTO>();

            if(game.GamesCategories != null)
            {
                foreach(var category in game.GamesCategories)
                {
                    result.Add(new CategoryDTO() { Id = category.CategoryId, Name = category.Category.Name });
                }
            }

            return result;
        }

        private List<GamesCategories> MapGamesCategories(GameCreationDTO gameCreationDTO,Game game)
        {
            var result = new List<GamesCategories>();

            if(gameCreationDTO.CategoriesIds == null) { return result; }

            foreach (var id in gameCreationDTO.CategoriesIds)
            {
                result.Add(new GamesCategories() { CategoryId = id });
            }

            return result;
        }

        private List<ShopsGames> MapShopsGames(GameCreationDTO gameCreationDTO, Game game)
        {
            var result = new List<ShopsGames>();

            if(gameCreationDTO.ShopsIds == null) { return result; }

            foreach (var id in gameCreationDTO.ShopsIds)
            {
                result.Add(new ShopsGames() { ShopId = id });
            }

            return result;
        }

        private List<GamesBrands> MapGamesBrands(GameCreationDTO gameCreationDTO, Game game)
        {
            var result = new List<GamesBrands>();

            if(gameCreationDTO.Brands == null) { return result; }

            foreach (var brand in gameCreationDTO.Brands)
            {
                result.Add(new GamesBrands() { BrandId = brand.Id, Company = brand.Company });
            }

            return result;
        }
    }
}
