using asbe.Internals;

namespace asbe.Endpoints;

public static class AuctionQuery
{
    public static IEndpointRouteBuilder MapAuctionQuery(this IEndpointRouteBuilder ep)
    {
        var g = ep.MapGroup("ep/auctions");
        
        g.MapGet("", async (AuctionContext auctionCtx) =>
        {
            var auctions = await auctionCtx.GetAllAuctionAsync();
            return Results.Ok(auctions);
        });

        g.MapGet("/{id}", async (string id, AuctionContext auctionCtx) =>
        {
            var auction = await auctionCtx.GetOneAuctionAsync(Guid.Parse(id));

            if (auction is null)
            {
                return Results.NotFound();
            }
            
            return Results.Ok(auction);
        });
        
        return ep;
    }
}