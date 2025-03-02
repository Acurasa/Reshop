using API.DTOs;
using API.Entities;

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
}