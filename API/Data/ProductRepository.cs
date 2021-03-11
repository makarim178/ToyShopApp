using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entity;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class ProductRepository : IProductRepository
    {
        private readonly DataContext _context;
        public ProductRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<Product> GetProductById(int id)
        {
            return await _context.Products
                .Include(c => c.Category)
                .Include(b => b.Brand)
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Product> GetProductBySkn(string Skn)
        {
            return await _context.Products.SingleOrDefaultAsync(x => x.Skn == Skn);
        }

        public async Task<IEnumerable<Product>> GetProductsAsync()
        {
            return await _context.Products
                .Include(c => c.Category)
                .Include(b => b.Brand)
                .ToListAsync();
        }

        public Task<bool> ProductExistsBySkn(string Skn)
        {
            return _context.Products.AnyAsync(x => x.Skn == Skn);
        }

        public async Task<Product> Save(Product product)
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();
            return product;
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(Product product)
        {
            _context.Entry(product).State = EntityState.Modified;
        }
    }
}