using System;
using Microsoft.EntityFrameworkCore;
using API.Entities;
namespace API.Data;

public class ShopContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<Product> Products { get; set; }
}