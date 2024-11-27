using System.Globalization;

namespace asbe.Models;

public record struct AuctionEntity()
{
    public string id { get; init; } = Guid.NewGuid().ToString();
    public string userId { get; init; }
    public string title { get; init; }
    public string picSrc { get; init; }
    public decimal startingBid { get; init; } = 0;
    public decimal currentBid { get; set; } = 0;
    public decimal intervalBid { get; init; } = 0;
    public string endAt { get; init; } = "";
}

public sealed class AuctionModel
{
    public Guid id { get; init; } = Guid.NewGuid();
    
    public Guid user_id { get; init; } = Guid.NewGuid();
    
    public string title { get; init; } = "";
    
    public string pic_src { get; init; } = "";
    
    public decimal current_bid { get; init; } = 0;
    
    public decimal starting_bid { get; init; } = 0;
    
    public decimal interval_bid { get; init; } = 0;

    public DateTime end_at { get; init; } = DateTime.UtcNow;
}

public static class Auction
{
    public static AuctionEntity MapModelToEntity(this AuctionModel model)
    {
        var entity = new AuctionEntity()
        {
            id = model.id.ToString(),
            userId = model.user_id.ToString(),
            title = model.title,
            picSrc = model.pic_src,
            currentBid = model.current_bid,
            startingBid = model.starting_bid,
            intervalBid = model.interval_bid,
            endAt = model.end_at.ToString(CultureInfo.InvariantCulture),
        };
        
        return entity;
    }
}
