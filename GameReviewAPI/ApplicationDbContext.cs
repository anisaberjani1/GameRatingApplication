using GameReviewAPI.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;

namespace GameReviewAPI
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext([NotNullAttribute] DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<GamesBrands>()
                .HasKey(x => new {x.BrandId, x.GameId});

            modelBuilder.Entity<GamesCategories>()
                .HasKey(x => new { x.CategoryId, x.GameId });

            modelBuilder.Entity<ShopsGames>()
                .HasKey(x => new { x.ShopId, x.GameId });

            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Brand> Brands { get; set; }
        public DbSet<Shop> Shops { get; set; }

        public DbSet<Game> Games { get; set; }

        public DbSet<GamesBrands> GamesBrands { get; set; }

        public DbSet<GamesCategories> GamesCategories { get; set; }

        public DbSet<ShopsGames> ShopsGames { get; set; }
        public DbSet<Rating> Ratings { get; set; }
    }
}
