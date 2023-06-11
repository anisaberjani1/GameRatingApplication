using System.ComponentModel.DataAnnotations;

namespace GameReviewAPI.Entities
{
    public class Game
    {
        public int Id { get; set; }

        [StringLength(maximumLength: 75)]
        [Required]
        public string Title { get; set; }
        public string Description { get; set; }

        public bool inShops { get; set; }

        public DateTime ReleaseDate { get; set; }

        public string Poster { get; set; }

        public List<GamesCategories> GamesCategories { get; set; }

        public List<ShopsGames> ShopsGames { get; set; }

        public List<GamesBrands> GamesBrands { get; set; }  

    }
}
