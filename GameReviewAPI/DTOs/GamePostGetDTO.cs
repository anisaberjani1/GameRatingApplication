namespace GameReviewAPI.DTOs
{
    public class GamePostGetDTO
    {
        public List<CategoryDTO> Categories { get; set; }

        public List<ShopDTO> Shops { get; set; }
    }
}
