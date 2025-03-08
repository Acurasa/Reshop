using System.Text.Json.Serialization;

namespace API.Entities;

public class Adress
{
    [JsonIgnore]
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string Line1 { get; set; }
    public string? Line2 { get; set; }
    public required string City { get; set; }
    public required string State { get; set; }
    [JsonPropertyName("pos tal_code")]
    public required string PostalCode { get; set; }
    public required string Country { get; set; }
}