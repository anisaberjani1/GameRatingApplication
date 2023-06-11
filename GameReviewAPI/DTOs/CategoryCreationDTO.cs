using GameReviewAPI.Validations;
using System.ComponentModel.DataAnnotations;

namespace GameReviewAPI.DTOs
{
    public class CategoryCreationDTO
    {
        [Required(ErrorMessage = "The field with name {0} is required")]
        [StringLength(50)]
        [FirstLetterUppercase]
        public string Name { get; set; }
    }
}
