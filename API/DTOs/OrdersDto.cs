using System;
using System.Collections.Generic;
using API.Entity;

namespace API.DTOs
{
    public class OrdersDto
    {
        public int Id { get; set; }
        public string UserType { get; set; }
        public ICollection<OrderDetails> OrderDetails { get; set; }
        public AppUser AppUser { get; set; }
        public ContactDetail ContactDetails { get; set; }
        public string OrderStatus { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime LastUpdated { get; set; }
    }
}