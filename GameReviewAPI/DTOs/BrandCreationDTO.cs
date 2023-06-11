using System.ComponentModel.DataAnnotations;

namespace GameReviewAPI.DTOs
{
    public class BrandCreationDTO
    {
        [Required]
        [StringLength(120)]

        public string Name { get; set; }

        public DateTime DateOfRelease { get; set; }

        public string Description { get; set; }

        public IFormFile Picture { get; set; }
    }
}
