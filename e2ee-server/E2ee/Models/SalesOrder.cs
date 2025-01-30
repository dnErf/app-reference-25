namespace E2ee.Models;

public sealed class SalesOrder {
    public string OrderId { get; set; }
    public string CustomerId { get; set; }
    public string PaymentId { get; set; }
    public List<SalesItem> Items { get; set; }
    public double TotalAmount { get; set; }
    public string Status { get; set; }
}

public sealed class SalesItem
{
    public string Id { get; set; } = Guid.CreateVersion7(DateTimeOffset.Now).ToString();
    public string OrderId { get; set; }
    public string ProductId { get; set; }
    public double Price { get; set; }
    public int Quantity { get; set; }
}
