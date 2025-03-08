using API.DTOs;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions;

public static class BasketExtensions
{
    public static BasketDto ToDto(this Basket basket)
    {
        return new BasketDto()
        {
            BasketId = basket.BasketId,
            Items = basket.Items.Select(i => new BasketItemDto()
            {
                ProductId = i.ProductId,
                Name = i.Product.Name,
                Price = i.Product.Price,
                Brand = i.Product.Brand,
                Type = i.Product.Type,
                Quantity = i.Quantity,
                PictureUrl = i.Product.PictureUrl
            })
        };
    }


    public static async Task<Basket> GetBasketWithItems(this IQueryable<Basket> query,
        string? basketId)
    {
        return await query
                   .Include(x => x.Items)
                   .ThenInclude(x => x.Product)
                   .FirstOrDefaultAsync(x => x.BasketId == basketId)
               ?? throw new Exception("Cannot get basket");
    }
}