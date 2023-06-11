namespace GameReviewAPI.DTOs
{
    public class BrandDTO
    {
        public int Id { get; set; } 
        public string Name { get; set; }

        public DateTime DateOfRelease { get; set; }

        public string Description { get; set; }

        public string Picture { get; set; }
    }
}
