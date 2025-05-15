using DataBase;
using Domain.Model;

namespace Repository
{
    public class LoginRepository
    {
        private readonly IDatabaseContext _context;
        public LoginRepository(IDatabaseContext context)
        {
            _context = context;
        }
 
        public string CreateTable()
        {
            string query = @"
        CREATE TABLE users (
            Id SERIAL PRIMARY KEY,
            Name VARCHAR(100) NOT NULL,
            Email VARCHAR(100) UNIQUE NOT NULL,
            Password VARCHAR(100) NOT NULL,
            UserType VARCHAR(20) NOT NULL CHECK (UserType IN ('Student', 'Teacher', 'Admin'))
        );";

            return _context.ExecuteQuery(query);
        }

        // 🟡 Insert User (Register)
        public string InsertUser(User user)
        {
            string query = $"INSERT INTO Users (Name, Email, Password, UserType) " +
                           $"VALUES ('{user.Name}', '{user.Email}', '{user.Password}', '{user.UserType}');";

            return _context.ExecuteQuery(query);
        }

        // 🔵 Get Users by UserType (Filtering Example)
        public List<User> GetUsersByType(string userType)
        {
            string query = $"SELECT * FROM Users WHERE UserType = '{userType}'";
            return _context.GetQuery<User>(query);
        }

        // 🟠 Get Specific User (Login)
        public List<User> GetUserByEmailAndPassword(string email, string password)
        {
            string query = $"SELECT * FROM Users WHERE Email = '{email}' AND Password = '{password}'";
            return _context.GetQuery<User>(query);
        }

        // 🔴 Get All Users
        public List<User> GetAllUsers()
        {
            string query = "SELECT * FROM Users";
            return _context.GetQuery<User>(query);
        }

    }
}
