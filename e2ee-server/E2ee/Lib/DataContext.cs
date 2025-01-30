using E2ee.Models;
using Microsoft.EntityFrameworkCore;

namespace E2ee.Lib;

public sealed class DataContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<SalesOrder> SalesOrders { get; set; } = null!;
    public DbSet<SalesItem> SalesItems { get; set; } = null!;
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<SalesOrder>()
            .HasKey(x => x.OrderId);
        
        modelBuilder.Entity<SalesOrder>()
            .HasMany<SalesItem>(x => x.Items)
            .WithOne()
            .HasForeignKey(x => x.OrderId);
        
        modelBuilder.Entity<SalesItem>()
            .HasKey((x) => x.Id);
        
        base.OnModelCreating(modelBuilder);
    }
}