using GameReviewAPI.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace GameReviewAPI.DTOs
{
    public class GameCreationDTO
    {
        public string Title { get; set; }
        public string Description { get; set; }

        public bool inShops { get; set; }

        public DateTime ReleaseDate { get; set; }

        public IFormFile Poster { get; set; }

        [ModelBinder(BinderType = typeof(TypeBinder<List<int>>))]
        public List<int> CategoriesIds { get; set; }

        [ModelBinder(BinderType = typeof(TypeBinder<List<int>>))]
        public List<int> ShopsIds { get; set; }

        [ModelBinder(BinderType = typeof(TypeBinder<List<GamesBrandsCreationDTO>>))]
        public List<GamesBrandsCreationDTO> Brands { get; set; }
    }
}
