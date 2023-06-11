namespace GameReviewAPI.Entities
{
    public class ShopsGames
    {

        public int ShopId { get; set; }
        public int GameId { get; set; }

        public Shop Shop { get; set; }
        public Game Game { get; set; }
    }
}
