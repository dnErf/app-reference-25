using System.ComponentModel.DataAnnotations.Schema;

namespace asbe.Models;

public record struct AuctionEntity(DateTime EndAt)
{
    public string Id { get; init; } = Guid.NewGuid().ToString();
    public string UserId { get; init; }
    public string Title { get; init; }
    public double StartingBid { get; init; } = 0;
    public double CurrentBid { get; set; } = 0;
    public double IntervalBid { get; init; } = 0;
    public DateTime EndAt { get; init; } = DateTime.UtcNow;
}

[Table("bidstur_auctions")]
public sealed class AuctionModel
{
    [Column("id")]
    public Guid Id { get; init; } = Guid.NewGuid();
    
    [Column("user_id")]
    public Guid UserId { get; init; } = Guid.NewGuid();
    
    [Column("title")]
    public string Title { get; init; } = "";
    
    [Column("current_bid")]
    public double CurrentBid { get; init; } = 0;
    
    [Column("starting_bid")]
    public double StartingBid { get; init; } = 0;
    
    [Column("interval_bid")]
    public double IntervalBid { get; init; } = 0;

    [Column("end_at")]
    public DateTime EndAt { get; init; } = DateTime.UtcNow;
}

public static class Auction
{
    
}
