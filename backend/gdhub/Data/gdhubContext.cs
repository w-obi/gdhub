using Microsoft.EntityFrameworkCore;
using gdhub.Models;

namespace gdhub.Data;

public class gdhubContext(DbContextOptions<gdhubContext> options) : DbContext(options)
{
    public DbSet<Game> Games => Set<Game>();
    public DbSet<User> Users => Set<User>();
}