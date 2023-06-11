namespace GameReviewAPI.DTOs
{
    public class AuthenticationResponse
    {
        public String Token { get; set; }   

        public DateTime Expiration { get; set; }
    }
}
