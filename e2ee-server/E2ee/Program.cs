using System.Threading.Channels;
using E2ee.Api;
using E2ee.Lib;
using E2ee.Models;
using E2ee.Services;
using Microsoft.EntityFrameworkCore;
using NRedisStack;
using StackExchange.Redis;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
    ?? builder.Configuration.GetValue<string>("DB_CONNECTION");
builder.Services.AddDbContext<DataContext>(o =>
{
    // o.UseInMemoryDatabase("e2ee");
    o.UseSqlServer(connectionString);
});

// var redisUrl = builder.Configuration.GetValue<string>("REDIS_URL") ?? "";
// var redisMultiplexer = ConnectionMultiplexer.Connect(redisUrl);
// builder.Services.AddSingleton<IConnectionMultiplexer>(redisMultiplexer);

builder.Services.AddSingleton<IConnectionMultiplexer>((serviceProvider) =>
{
    using ILoggerFactory el = LoggerFactory.Create(b => b.AddConsole());
    
    return ConnectionMultiplexer.Connect(new ConfigurationOptions
    {
        EndPoints = { @"" },
        LoggerFactory = el,
        Ssl = false,
        AbortOnConnectFail = false,
        ConnectTimeout = 10_000
    });
});

builder.Services.AddHostedService<RedisTask>();
builder.Services.AddSingleton(Channel.CreateUnbounded<RedisDataEvent>(new UnboundedChannelOptions {
    SingleReader = true,
    AllowSynchronousContinuations = true
}));

builder.Services.AddScoped<CheckoutService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
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

app.MapCheckoutEndpoint();

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}