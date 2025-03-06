using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using API.Data;
using API.Entities;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using API.Extensions;
using API.RequestHelpers;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController(ShopContext dbContext) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetAllProducts([FromQuery]ProductParams productParams)
        {
            var query = dbContext.Products
            .Sort(productParams.OrderBy)
            .Search(productParams.SearchTerm)
            .Filter(productParams.Brands,productParams.Types)
            .AsQueryable();
            var products = await PagedList<Product>.ToPagedList(query, productParams.PageNumber, productParams.PageSize);
            return Ok(new {Items = products, products.Metadata});
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int Id)
        {
            var product = await dbContext.Products.FindAsync(Id);

            if (product is null) return NotFound();

            return product;

        }


        [HttpGet("filters")]

        public async Task<IActionResult> GetFilters()
        {
            var brands = await dbContext.Products.Select(x=>x.Brand).Distinct().ToListAsync();
            var types = await dbContext.Products.Select(x=>x.Type).Distinct().ToListAsync();
            
            return Ok(new {brands, types});
        }
    }
}
