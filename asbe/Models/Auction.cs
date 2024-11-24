using System.ComponentModel.DataAnnotations.Schema;

namespace asbe.Models;

public record struct AuctionEntity(Guid UserId, double StartingBid, double IntervalBid, DateTime EndAt)
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public double CurrentBid { get; set; } = StartingBid;
}

[Table("bidstur_auctions")]
public sealed class AuctionModel
{
    [Column("id")]
    public string Id { get; init; } = "";
    
    [Column("user_id")]
    public string UserId { get; init; } = "";
    
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