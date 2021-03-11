using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entity;

namespace API.Interfaces
{
    public interface IProductRepository
    {
        void Update(Product product);
        Task<Product> Save(Product product);

        Task<bool> SaveAllAsync();

        Task<bool> ProductExistsBySkn(string Skn);

        Task<IEnumerable<Product>> GetProductsAsync();
        Task<Product> GetProductById(int id);
        Task<Product> GetProductBySkn(string Skn);
    }
}