using Dapper;
using Microsoft.AspNetCore.Http.Connections;
using Npgsql;

namespace asbe.Internals;

public class DataContext
{
    private readonly string? _connection_string;

    public DataContext(IConfiguration config)
    {
        // _connection_string = config.GetConnectionString("PgDev");
        
        if (config.GetValue<string>("ConnectionStrings:PgDev") is not null)
        {
            _connection_string = config.GetValue<string>("ConnectionStrings:PgDev");
        }
        else if (Environment.GetEnvironmentVariable("PgDev") is not null)
        {
            _connection_string = Environment.GetEnvironmentVariable("PgDev");
        }
        
        if (string.IsNullOrEmpty(_connection_string)) throw new ArgumentNullException(nameof(_connection_string));
    }

    public async Task InitAsync()
    {
        var q = """
            create table if not exists "bidstur_auctions" (
                "id" uuid DEFAULT gen_random_uuid() PRIMARY KEY,
                "user_id" uuid,
                "title" text,
                "current_bid" numeric,
                "starting_bid" numeric,
                "interval_bid" numeric,
                "end_at" timestamp with time zone
            ); 
        """;

        using (var pg = new NpgsqlConnection(_connection_string))
        {
            await pg.ExecuteAsync(q);
        }
    }

    public NpgsqlConnection NewPgConnection()
    {
        return new NpgsqlConnection(_connection_string);
    }
}