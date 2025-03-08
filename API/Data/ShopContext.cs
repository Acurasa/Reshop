using System;
using Microsoft.EntityFrameworkCore;
using API.Entities;
using API.Entities.OrderAggregate;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace API.Data;

public class ShopContext(DbContextOptions options) : IdentityDbContext<User>(options)
{
    public required DbSet<Product> Products { get; set; }
    public required DbSet<Basket> Baskets { get; set; }
    public required DbSet<Order> Orders { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.Entity<IdentityRole>().HasData(
            new IdentityRole {Id = "252bf4ca-aae1-4f5c-b81f-a4c5b07589fb",Name = "Member", NormalizedName = "MEMBER" },
            new IdentityRole {Id = "6b21f307-ee7c-41ac-981c-d054a4335a74", Name = "Admin", NormalizedName = "ADMIN" });
    }
}