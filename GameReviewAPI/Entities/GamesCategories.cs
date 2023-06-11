namespace GameReviewAPI.Entities
{
    public class GamesCategories
    {
        public int CategoryId { get; set; }

        public int GameId { get; set; }


        public Category Category { get; set; }
        public Game Game { get; set; }  
    }
}
