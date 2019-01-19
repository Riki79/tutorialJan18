using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.API.Models;

namespace DatingApp.API.Interfaces
{
    public interface IDatingRepository
    {
         void Add<T>(T entity) where T: class;
         void Delete<T>(T entity) where T: class;
        Task<bool> SaveAll<T>(T entity) where T: class;

        Task<IEnumerable<UserModel>> GetUsers();
        Task<UserModel> GetUser(int id);

    }
}