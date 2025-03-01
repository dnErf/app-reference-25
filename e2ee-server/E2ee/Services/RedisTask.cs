using System.Threading.Channels;
using E2ee.Models;
using StackExchange.Redis;

namespace E2ee.Services;

public class RedisTask : BackgroundService
{
    private readonly IHostApplicationLifetime _applicationLifetime;
    private readonly Channel<RedisDataEvent> _channel;
    private readonly IConnectionMultiplexer _redis;
    
    public RedisTask(IHostApplicationLifetime applicationLifetime, Channel<RedisDataEvent> channel, IConnectionMultiplexer redis)
    {
        _applicationLifetime = applicationLifetime;
        _channel = channel;
        _redis = redis;

        // If your password uses special chars you’ll need to escape it, e.g:
        // $"redis-service:6379?username={usr}&password={pwd.UrlEncode()}"
        // var c = new ConfigurationOptions
        // {
        //     Ssl = true,
        //     EndPoints = { @"172.20.163.131:6379" },
        //     ConnectRetry = 3,
        //     AbortOnConnectFail = true
        // };
        
        // _redis = ConnectionMultiplexer.Connect(c);
    }
    
    private static bool False(Action action)
    {
        action();
        return false;
    }

    protected override Task ExecuteAsync(CancellationToken ct) => Task.Run(async () =>
    {
        try
        {
            var r = _redis.GetDatabase();
            var streamKey = "LOG_ACTION";
            
            // await foreach (RedisDataEvent redisEvent in _channel.Reader.ReadAllAsync(ct))
            // {
            //     // var entry = new NameValueEntry(redisEvent.subject, redisEvent.subject);
            //     var entry = new NameValueEntry[]
            //     {
            //         new("action", redisEvent.action),
            //         new("subject", redisEvent.subject),
            //     };
            //     
            //     await r.StreamAddAsync(streamKey, entry);
            // }

            while (!ct.IsCancellationRequested)
            {
                r.StringSet("testKey", "testValue");
                string value = r.StringGet("testKey");
                Console.WriteLine($"Value: {value}");
                
                // var entry = new NameValueEntry[]
                // {
                //     new("action", "hello"),
                //     new("subject", "world"),
                // };
                //
                // await r.StreamAddAsync(streamKey, entry);
            }
        }
        catch (Exception exc) when (False(() => Console.WriteLine(exc.ToString())))
        {

        }
        finally
        {
            _applicationLifetime.StopApplication();
        }
    });
}