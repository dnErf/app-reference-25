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

    private static async Task<IResult> PostCheckout(SalesOrder order, CheckoutService checkoutService) 
    {
        await checkoutService.PostOrderHandlerAsync(order);
        return TypedResults.Ok();
    }

    private static async Task<IResult> PatchPaymentId(SalesPayment payment, CheckoutService checkoutService)
    {
        Console.WriteLine($"payment id  ~ {payment.PaymentId}");
        await checkoutService.PatchSalesPaymentHandlerAsync(payment);
        return TypedResults.Ok();
    }
}