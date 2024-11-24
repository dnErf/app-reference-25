using asbe.Models;
using Dapper;

namespace asbe.Internals;

public class AuctionContext(DataContext ctx)
{
    private readonly DataContext _ctx = ctx;

    public async Task<IEnumerable<AuctionModel>> GetAllAuctionAsync()
    {
        var q = """
                select id, user_id, title, current_bid, starting_bid, interval_bid, end_at
                from bidstur_auctions
                """;
        
        using (var pg = _ctx.NewPgConnection())
        {
            var auctions = await pg.QueryAsync<AuctionModel>(q);
            return auctions;
        }
    }
}