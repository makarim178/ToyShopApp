using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class CategoryController : BaseApiController
    {
        private readonly DataContext _context;
        public CategoryController(DataContext context)
        {
            _context = context;
        }

        [HttpPost("addcategory")]
        public async Task<ActionResult<Category>> AddBrand(NewCategory category)
        {
           if(await CategoryExists(category.Categoryname)) return BadRequest(category.Categoryname + " already exists");

           var cat = new Category {
               CategoryName = category.Categoryname
           };

           _context.Category.Add(cat);
           await _context.SaveChangesAsync();

           return new Category {
               Id = cat.Id,
               CategoryName = cat.CategoryName
            };
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
        {
            return Ok(await _context.Category.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Category>> GetBrandById(int id)
        {
            return await _context.Category.FindAsync(id);
        }

        public async Task<bool> CategoryExists(string categoryname)
        {
            return await _context.Category.AnyAsync(x => x.CategoryName == categoryname);
        }
    }
}