using System.ComponentModel.DataAnnotations;

namespace GameReviewAPI.DTOs
{
    public class GameDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }

        public bool inShops { get; set; }

        public DateTime ReleaseDate { get; set; }

        public string Poster { get; set; }

        public List<CategoryDTO> Categories { get; set; }

        public List<ShopDTO> Shops { get; set; }

        public List<BrandsGameDTO> Brands { get; set; }

        public double AverageVote { get; set; }

        public int UserVote { get; set; }
    }
}
