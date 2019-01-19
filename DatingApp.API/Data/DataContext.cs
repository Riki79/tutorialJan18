using Microsoft.EntityFrameworkCore;
using DatingApp.API.Models;

namespace DatingApp.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base (options)
        {}

        public DbSet<ValueModel> Values { get; set; }
        public DbSet<UserModel> Users { get; set; }
        public DbSet<PhotoModel> Photos { get; set; }
    }
}