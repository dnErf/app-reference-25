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
                id = Guid.Parse(auction.id),
                user_id = Guid.Parse(auction.userId),
                title = auction.title,
                pic_src = auction.picSrc,
                starting_bid = auction.startingBid,
                current_bid = auction.startingBid,
                interval_bid = 0
            });

            var auctions = await auctionCtx.GetAllAuctionAsync();

            return TypedResults.Ok(auctions);
        });
        
        return ep;
    }
}