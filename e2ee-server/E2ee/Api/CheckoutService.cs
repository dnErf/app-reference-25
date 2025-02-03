using E2ee.Lib;
using E2ee.Models;
using Microsoft.EntityFrameworkCore;

namespace E2ee.Api;

public sealed class CheckoutService(DataContext _ctx)
{
    public async Task PostOrderHandlerAsync(SalesOrder order)
    {
        _ctx.SalesOrders.Add(order);
        await _ctx.SaveChangesAsync();
    }

    public async Task PatchSalesPaymentHandlerAsync(SalesPayment payment)
    {
        await _ctx.SalesOrders
            .Where(x => x.OrderId == payment.OrderId)
            .ExecuteUpdateAsync(x => 
                x.SetProperty(y => y.PaymentId, payment.PaymentId)
                    .SetProperty(y => y.Status, "paid"));
    }
}