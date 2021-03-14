using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entity;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
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

        [Authorize]
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
        }

        [HttpGet("{id}", Name="GetproductById")]
        public async Task<ActionResult<ProductDto>> GetproductById(int id)
        {
            var product = await _productRepository.GetProductById(id);
            return _mapper.Map<ProductDto>(product);
        }

        [HttpGet("skn/{skn}", Name="GetProductBySkn")]
        public async Task<ActionResult<ProductDto>> GetProductBySkn(string skn)
        {
            var product = await _productRepository.GetProductBySkn(skn);
            return _mapper.Map<ProductDto>(product);
        }

        // [Authorize]
        [HttpPut("product")]
        public async Task<ActionResult> UpdateProduct(Product product) 
        {
            _productRepository.Update(product);
            product.LastUpdatedDate = DateTime.Now;
            if(await _productRepository.SaveAllAsync()) return NoContent();

            return BadRequest("product doesn't exists");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProduct(int id) 
        {
            var product = await _productRepository.GetProductById(id);
            if(product != null)
            {
                _productRepository.Delete(product);
                if(await _productRepository.SaveAllAsync()) return NoContent();
            } 

            return BadRequest("product doesn't exists");

        }

        public async Task<bool> ProductExists(string Skn)
        {
            return await _productRepository.ProductExistsBySkn(Skn);
        }
    }
}