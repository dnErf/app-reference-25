using asbe.Internals;

namespace asbe.Endpoints;

public static class AuctionQuery
{
    public static IEndpointRouteBuilder MapAuctionQuery(this IEndpointRouteBuilder ep)
    {
        var mg = ep.MapGroup("ep/auctions");
        
        mg.MapGet("", async (AuctionContext auctionCtx) =>
        {
            var auctions = await auctionCtx.GetAllAuctionAsync();
            return Results.Ok(auctions);
        });
        
        return ep;
    }
}