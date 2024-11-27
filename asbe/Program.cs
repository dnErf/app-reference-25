using asbe.Endpoints;
using asbe.Internals;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddCors(o =>
{
    o.AddPolicy("dev",p =>
    {
        p.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
    });
    
    o.AddPolicy("prod", p =>
    {
        p.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:9112", "http://ng-bidstur", "https://xcogo844csk8ws0kkgswc804.vdbx.duckdns.org");
    });
});

// singleton
builder.Services.AddSingleton<DataContext>();

// scoped
builder.Services.AddScoped<AuctionContext>();

// -

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseCors("dev");
    app.MapOpenApi();

    using (var scope = app.Services.CreateScope())
    {
        var ctx = scope.ServiceProvider.GetService<DataContext>();
        await ctx!.InitAsync();
    }
}
else
{
    app.UseCors("prod");
}

app.UseHttpsRedirection();

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
    {
        var forecast = Enumerable.Range(1, 5).Select(index =>
                new WeatherForecast
                (
                    DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                    Random.Shared.Next(-20, 55),
                    summaries[Random.Shared.Next(summaries.Length)]
                ))
            .ToArray();
        return forecast;
    })
    .WithName("GetWeatherForecast");

app.MapAuctionQuery();
app.MapAuctionMutations();

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}