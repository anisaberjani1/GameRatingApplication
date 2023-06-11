using System.ComponentModel.DataAnnotations;

namespace GameReviewAPI.Entities
{
    public class GamesBrands
    {
        public int BrandId { get; set; }
        public int GameId { get; set; }
        [StringLength(maximumLength:75)]
        public string Company { get; set; }

        public Brand Brand { get; set; }

        public Game Game { get; set; }

    }
}
