using asbe.Models;
using Dapper;

namespace asbe.Internals;

public class AuctionContext(DataContext ctx)
{
    private readonly DataContext _ctx = ctx;

    public async Task<IEnumerable<AuctionModel>?> GetAllAuctionAsync()
    {
        var q = """
                select id, user_id, title, pic_src, current_bid, starting_bid, interval_bid, end_at from bidstur_auctions
                """;
        
        using (var pg = _ctx.NewPgConnection())
        {
            var auctions = await pg.QueryAsync<AuctionModel>(q);
            return auctions;
        }
    }

    public async Task<AuctionModel?> GetOneAuctionAsync(Guid Id)
    {
        var q = """
                select id, user_id, title, current_bid, starting_bid, interval_bid, end_at
                from bidstur_auctions
                where bidstur_auctions.id = @Id
                """;

        using (var pg = _ctx.NewPgConnection())
        {
            var auction = await pg.QuerySingleOrDefaultAsync<AuctionModel>(q, new { Id = Id });
            return auction;
        }
    }

    public async Task NewAuctionAsync(AuctionModel auction)
    {
        var q = """
                insert into bidstur_auctions (id, user_id, title, current_bid, starting_bid, interval_bid, end_at)
                values (@Id, @UserId, @Title, @CurrentBid, @StartingBid, @IntervalBid, @EndAt)
                """;

        using (var pg = _ctx.NewPgConnection())
        {
            await pg.ExecuteAsync(q, auction);
        }
    }
}