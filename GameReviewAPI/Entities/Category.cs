using GameReviewAPI.Validations;
using System.ComponentModel.DataAnnotations;

namespace GameReviewAPI.Entities
{
    public class Category
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "The field with name {0} is required")]
        [StringLength(50)]
        [FirstLetterUppercase]
        public string Name { get; set; }

    }
}
