namespace GameReviewAPI.DTOs
{
    public class GamePutGetDTO
    {

        public GameDTO Game { get; set; }

        public List<CategoryDTO> SelectedCategories { get; set; }
        public List<CategoryDTO> NonSelectedCategories { get; set; }

        public List<ShopDTO> SelectedShops { get; set; }

        public List<ShopDTO> NonSelectedShops { get; set; }

        public List<BrandsGameDTO> Brands { get; set; }
    }
}
