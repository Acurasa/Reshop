using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using API.Data;
using API.Entities;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController(ShopContext dbContext) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetAllProducts()
        {
            return await dbContext.Products.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int Id)
        {
            var product = await dbContext.Products.FindAsync(Id);

            if(product is null) return NotFound();

            return product;

        }
    }
}
