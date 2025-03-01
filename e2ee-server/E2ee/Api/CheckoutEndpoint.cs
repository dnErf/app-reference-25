using System.Threading.Channels;
using Microsoft.AspNetCore.Mvc;
using E2ee.Models;

namespace E2ee.Api;

public static class CheckoutEndpoint {
    public static IEndpointRouteBuilder MapCheckoutEndpoint(this IEndpointRouteBuilder builder)
    {
        var ep = builder.MapGroup("api/checkout");

        ep.MapPost("", PostCheckout);
        ep.MapPatch("", PatchPaymentId);

        return builder;
    }

    private static async Task<IResult> PostCheckout(SalesOrder order, CheckoutService checkoutService, Channel<RedisDataEvent> channel) 
    {
        await checkoutService.PostOrderHandlerAsync(order);
        await channel.Writer.WriteAsync(new RedisDataEvent { subject = order.OrderId, action = "POST_ORDER" });
        return TypedResults.Ok();
    }

    private static async Task<IResult> PatchPaymentId(SalesPayment payment, CheckoutService checkoutService, Channel<RedisDataEvent> channel)
    {
        Console.WriteLine($"payment id  ~ {payment.PaymentId}");
        await checkoutService.PatchSalesPaymentHandlerAsync(payment);
        await channel.Writer.WriteAsync(new RedisDataEvent { subject = payment.OrderId,  action = "PATCH_ORDER_PAYMENT" });
        return TypedResults.Ok();
    }
}