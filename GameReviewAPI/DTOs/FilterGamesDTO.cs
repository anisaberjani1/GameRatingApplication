namespace GameReviewAPI.DTOs
{
    public class FilterGamesDTO
    {
        public int Page { get; set; }

        public int RecordsPerPage { get; set; }

        public PaginationDTO PaginationDTO
        {
            get { return new PaginationDTO() { Page = Page, RecordsPerPage = RecordsPerPage }; }

        }

        public string Title { get; set; }

        public int CategoryId { get; set; }

        public bool InShops { get; set; }

        public bool UpcomingReleases { get; set; }
    }
}
