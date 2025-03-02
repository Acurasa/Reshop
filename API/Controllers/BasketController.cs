using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class BasketController(ShopContext context) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<BasketDto>> GetBasket()
    {
        Basket? basket = await RetrieveBasket();

        if (basket == null) return NoContent();

        return basket.ToDto();
    }


    [HttpPost]
    public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity)
    {
        var basket = await RetrieveBasket();
        basket ??= CreateBasket();

        var product = await context.Products.FindAsync(productId);

        if (product == null) return BadRequest("Product not found");

        basket.AddItem(product, quantity);

        var result = await context.SaveChangesAsync();

        if (result <= 0) return BadRequest();

        return CreatedAtAction(nameof(GetBasket), new { id = productId, quantity = quantity }, basket.ToDto());
    }

    private Basket CreateBasket()
    {
        var basketId = Guid.NewGuid().ToString();

        var cookieOptions = new CookieOptions
        {
            IsEssential = true,
            Expires = DateTimeOffset.UtcNow.AddDays(35)
        };

        Response.Cookies.Append("basketId", basketId, cookieOptions);
        Basket basket = new Basket() { BasketId = basketId };
        context.Baskets.Add(basket);
        return basket;
    }

    private async Task<Basket?> RetrieveBasket()
    {
        return await context.Baskets
            .Include(x => x.Items)
            .ThenInclude(x => x.Product)
            .FirstOrDefaultAsync(x => x.BasketId == Request.Cookies["basketId"]);
    }

    [HttpDelete]
    public async Task<IActionResult> RemoveBasketItem(int productId, int quantity)
    {
        var basket = await RetrieveBasket();

        if (basket is null) return NotFound();

        var seekingProduct = basket.Items.Select(x => x.Product).FirstOrDefault(x => x.Id == productId);

        if (seekingProduct is null) return BadRequest();

        basket.RemoveItem(seekingProduct, quantity);
        if (await context.SaveChangesAsync() <= 0) return BadRequest("Failed to update basket");
        return Ok();
    }
}