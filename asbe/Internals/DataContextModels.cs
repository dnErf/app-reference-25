using System.ComponentModel.DataAnnotations.Schema;

namespace asbe.Internals;

public class DataContextModels { }

[Table("bidstur_auctions")]
public class Auction
{
    [Column("id")]
    public string Id { get; set; } = "";
    
    [Column("user_id")]
    public string UserId { get; set; } = "";
    
    [Column("title")]
    public string Title { get; set; } = "";
    
    [Column("current_bid")]
    public double CurrentBid { get; set; } = 0;
    
    [Column("starting_bid")]
    public double StartingBid { get; set; } = 0;
    
    [Column("interval_bid")]
    public double IntervalBid { get; set; } = 0;

    [Column("end_at")]
    public DateTime EndAt { get; set; } = DateTime.UtcNow;
}
