using System.ComponentModel.DataAnnotations;

namespace GameReviewAPI.DTOs
{
    public class RatingDTO
    {
        [Range(1,5)]
        public int Rating { get; set; }

        public int GameId { get; set; }
    }
}
