using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BrandController : BaseApiController
    {
        private readonly DataContext _context;
        public BrandController(DataContext context)
        {
            _context = context;

        }

        [HttpPost("brand")]
        public async Task<ActionResult<Brand>> AddBrand(NewBrand brand)
        {
           if(await BrandExists(brand.Brandname)) return BadRequest(brand.Brandname + " already exists");

           var brands = new Brand {
               BrandName = brand.Brandname
           };

           _context.Brand.Add(brands);
           await _context.SaveChangesAsync();
           return brands;

        //    return new Brand {
        //        Id = brands.Id,
        //        BrandName = brands.BrandName
        //     };
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Brand>>> GetBrands()
        {
            return Ok(await _context.Brand.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Brand>> GetBrandById(int id)
        {
            return await _context.Brand.FindAsync(id);
        }

        // [HttpGet("{brandname}")]
        // public async Task<ActionResult<Brand>> GetBrandsByName(string brandname)
        // {
        //     return await _context.Brand.SingleOrDefaultAsync(x => x.BrandName == brandname);
        // }


        public async Task<bool> BrandExists(string brandname)
        {
            return await _context.Brand.AnyAsync(x => x.BrandName == brandname);
        }
    }
}