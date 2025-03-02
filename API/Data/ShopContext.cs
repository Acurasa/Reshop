using System;
using Microsoft.EntityFrameworkCore;
using API.Entities;
namespace API.Data;

public class ShopContext(DbContextOptions options) : DbContext(options)
{
    public required DbSet<Product> Products { get; set; }
    public required DbSet<Basket> Baskets { get; set; }
}