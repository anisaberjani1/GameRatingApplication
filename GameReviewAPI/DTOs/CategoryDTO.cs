using GameReviewAPI.Validations;
using System.ComponentModel.DataAnnotations;

namespace GameReviewAPI.DTOs
{
    public class CategoryDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
