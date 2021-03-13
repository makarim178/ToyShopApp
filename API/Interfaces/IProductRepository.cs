using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entity;

namespace API.Interfaces
{
    public interface IProductRepository
    {
        void Update(Product product);
        void Delete(Product product);
        Task<Product> Save(Product product);

        Task<bool> SaveAllAsync();

        Task<bool> ProductExistsBySkn(string Skn);
        //Task<bool> ProductExistsById(int id);

        Task<IEnumerable<Product>> GetProductsAsync();
        Task<Product> GetProductById(int id);
        Task<Product> GetProductBySkn(string Skn);

        
    }
}