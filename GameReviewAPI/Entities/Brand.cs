using System.ComponentModel.DataAnnotations;

namespace GameReviewAPI.Entities
{
    public class Brand
    {
        public int Id { get; set; }
        [Required]
        [StringLength(120)]

        public string Name { get; set; }

        public DateTime DateOfRelease { get; set; }

        public string Description { get; set; }

        public string Picture { get; set; }
    }
}
