using Microsoft.AspNetCore.Mvc;
using E2ee.Models;

namespace E2ee.Api;

public static class CheckoutEndpoint {
    public static IEndpointRouteBuilder MapCheckoutEndpoint(this IEndpointRouteBuilder builder)
    {
        var ep = builder.MapGroup("api/checkout");

        ep.MapPost("", PostCheckout);

        return builder;
    }

    private static async Task<IResult> PostCheckout(SalesOrder order, CheckoutService checkoutService) 
    {
        Console.WriteLine(order.CustomerId);
        await checkoutService.PostOrderHandlerAsync(order);
        return TypedResults.Ok();
    }
}