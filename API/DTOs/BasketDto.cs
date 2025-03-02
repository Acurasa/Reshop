namespace API.DTOs;

public class BasketDto
{
    public required string BasketId { get; set; }
    public IEnumerable<BasketItemDto> Items { get; set; } = [];
}