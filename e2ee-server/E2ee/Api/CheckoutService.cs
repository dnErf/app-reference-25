using E2ee.Lib;
using E2ee.Models;

namespace E2ee.Api;

public sealed class CheckoutService(DataContext _ctx)
{
    public async Task PostOrderHandlerAsync(SalesOrder order)
    {
        _ctx.SalesOrders.Add(order);
        await _ctx.SaveChangesAsync();
    }
}