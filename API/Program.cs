using API.Data;
using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<ShopContext>(opt=>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
var app = builder.Build();
builder.Services.AddCors();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
}
app.UseCors(opt=>
{
    opt.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:3000");
});
app.MapControllers();

DbInitializer.DbInit(app);

app.Run();
