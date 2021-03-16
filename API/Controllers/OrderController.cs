using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entity;
using API.Interfaces;
using AutoMapper;
using Braintree;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ordersController : BaseApiController
    {

        private readonly IBraintreeGate _brain;

        private readonly IOrdersRepository _ordersRepository;
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        private readonly IProductRepository _productRepository;
        private readonly IOrderDetailRepository _orderDetailRepository;

        public ordersController(IBraintreeGate brain, IMapper mapper, IOrdersRepository ordersRepository, DataContext context, IProductRepository productRepository, IOrderDetailRepository orderDetailRepository)
        {
            _orderDetailRepository = orderDetailRepository;
            _productRepository = productRepository;
            _context = context;
            _mapper = mapper;
            _ordersRepository = ordersRepository;
            _brain = brain;
        }

        public class ClientToken
        {
            public string token { get; set; }
            public ClientToken(string token)
            {
                this.token = token;
            }

        }

        public class Nonce
        {
            public string nonce { get; set; }
            public decimal chargeAmount { get; set; }

            public Nonce(string nonce)
            {
                this.nonce = nonce;
                this.chargeAmount = chargeAmount;
            }
        }

        [HttpGet("getclienttoken")]
        public ActionResult<ClientToken> GetToken()
        {

            var getway = _brain.GetGateWay();
            var clientToken = getway.ClientToken.Generate();

            ClientToken ct = new ClientToken(clientToken);

            return Ok(ct);
        }

        public class resultDto
        {
            public string nonce { get; set; }
            public string status { get; set; }
        }


        [HttpPost("verifypayment")]
        public ActionResult<resultDto> VerifyPayment([FromBody] Nonce nonce)
        {
            Console.WriteLine("\n\nNonce: " + nonce);
            var getway = _brain.GetGateWay();
            var request = new TransactionRequest
            {
                Amount = Convert.ToDecimal(nonce.chargeAmount),
                PaymentMethodNonce = nonce.nonce,
                Options = new TransactionOptionsRequest
                {
                    SubmitForSettlement = true
                }
            };


            Result<Transaction> result = getway.Transaction.Sale(request);

            Console.WriteLine("\n\nresult: " + result.Target.ProcessorResponseText);
            if (result.Target.ProcessorResponseText == "Approved")
            {
                Console.WriteLine("\nis it approved? : " + nonce.nonce);
                var returnResult = new resultDto
                {
                    nonce = nonce.nonce,
                    status = "Approved"
                };

                return Ok(returnResult);

            }

            Console.WriteLine("\n it is not approved " + nonce.nonce);
            return BadRequest("Not approved");
        }

        [HttpPost("orders")]
        public async Task<ActionResult<Orders>> Addorders(Orders orders)
        {

            orders.CreatedDate = DateTime.Now;
            orders.LastUpdated = DateTime.Now;
            await _ordersRepository.Save(orders);
            return orders;
        }

        [HttpPost("orderDetails")]
        public async Task<ActionResult<OrderDetails>> SaveOrderDetails(OrderDetails orderDetails)
        {
            await _orderDetailRepository.Save(orderDetails);

            return orderDetails;
        }

        [HttpGet("orderdetails/{orderid}")]
        public async Task<ActionResult<IEnumerable<OrderDetails>>> GetOrdersByOrderId(int orderid) 
        {
            return Ok(await _orderDetailRepository.GetByOrderId(orderid));
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrdersDto>>> GetOrders()
        {
            return Ok(await _ordersRepository.GetAll());
        }

        [HttpGet("{id}", Name = "GetordersById")]
        public async Task<ActionResult<Orders>> GetordersById(int id)
        {
            var product = await _ordersRepository.GetById(id);
            return product;
        }
    }
}