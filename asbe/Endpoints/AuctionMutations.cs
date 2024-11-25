using asbe.Internals;
using asbe.Models;
using Microsoft.AspNetCore.Mvc;

namespace asbe.Endpoints;

public static class AuctionMutations
{
    public static IEndpointRouteBuilder MapAuctionMutations(this IEndpointRouteBuilder ep)
    {
        var g = ep.MapGroup("ep/auctions");

        g.MapPost("", async ([FromBody] AuctionEntity auction, AuctionContext auctionCtx) =>
        {
            await auctionCtx.NewAuctionAsync(new AuctionModel()
            {
                Id = Guid.Parse(auction.Id),
                UserId = Guid.Parse(auction.UserId),
                Title = auction.Title,
                StartingBid = auction.StartingBid,
                CurrentBid = auction.StartingBid,
                IntervalBid = 0
            });

            var auctions = await auctionCtx.GetAllAuctionAsync();

            return TypedResults.Ok(auctions);
        });
        
        return ep;
    }
}