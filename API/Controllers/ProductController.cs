using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entity;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ProductController : BaseApiController
    {
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;

        public ProductController(IProductRepository productRepository, IMapper mapper)
        {
            _mapper = mapper;
            _productRepository = productRepository;
        }

        [HttpPost("addProduct")]
        public async Task<ActionResult<Product>> AddBrand(NewProduct newProd)
        {
            if (await ProductExists(newProd.Skn)) return BadRequest("This Product already exists");

            var prod = new Product
            {
                Skn = newProd.Skn,
                ProductName = newProd.ProductName,
                ProductDesc = newProd.ProductDesc,
                CategoryId = newProd.Category.Id,
                BrandId = newProd.Brand.Id,
                RecommendedMinimumAge = newProd.RecommendedMinimumAge,
                RecommendedGender = newProd.RecommendedGender,
                ProductPrice = newProd.ProductPrice,
                AvailableQty = newProd.AvailableQty,
                MinOrderQty = newProd.MinOrderQty,
                ProductCreatedDate = DateTime.Now,
                LastUpdatedDate = DateTime.Now
            };

            return await _productRepository.Save(prod);
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetAllProducts()
        {
            var product = await _productRepository.GetProductsAsync();
            var prodToReturn = _mapper.Map<IEnumerable<ProductDto>>(product);

            return Ok(prodToReturn);
            // var productsToReturn = _mapper.Map<ProductDto>(products);

            // return Ok(productsToReturn);
        }

        [HttpGet("{id}", Name="GetproductById")]
        public async Task<ActionResult<ProductDto>> GetproductById(int id)
        {
            var product = await _productRepository.GetProductById(id);
            return _mapper.Map<ProductDto>(product);
        }

        [HttpGet("skn{skn}", Name="GetProductBySkn")]
        public async Task<ActionResult<ProductDto>> GetProductBySkn(string skn)
        {
            var product = await _productRepository.GetProductBySkn(skn);
            return _mapper.Map<ProductDto>(product);
        }

        public async Task<bool> ProductExists(string Skn)
        {
            return await _productRepository.ProductExistsBySkn(Skn);
        }
    }
}