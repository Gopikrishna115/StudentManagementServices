using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Model;
using Repository;

namespace StudentServices
{
    public class UserService
    {
        private readonly LoginRepository _userRepository;

        public UserService(LoginRepository userRepository)
        {
            _userRepository = userRepository;
        }

        // 🟢 Create Users Table
        public string CreateTable()
        {
            return _userRepository.CreateTable();
        }

        // 🟡 Register User
        public string RegisterUser(User user)
        {
            if (string.IsNullOrEmpty(user.Name) || string.IsNullOrEmpty(user.Email) || string.IsNullOrEmpty(user.Password) || string.IsNullOrEmpty(user.UserType))
            {
                return "Invalid input";
            }
            return _userRepository.InsertUser(user);
        }

        // 🔵 Get Users by Type (Student, Teacher, Admin)
        public List<User> GetUsersByType(string userType)
        {
            return _userRepository.GetUsersByType(userType);
        }

        // 🟠 Login User
        public User LoginUser(string email, string password)
        {
            var users = _userRepository.GetUserByEmailAndPassword(email, password);
            return users.Count > 0 ? users[0] : null;
        }

        // 🔴 Get All Users
        public List<User> GetAllUsers()
        {
            return _userRepository.GetAllUsers();
        }
    }
}
