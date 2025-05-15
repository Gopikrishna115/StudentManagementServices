using Domain.Model;
using Microsoft.AspNetCore.Mvc;
using StudentServices;

namespace StudentManagementServices.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public IActionResult CreateTable()
        {
            string result = _userService.CreateTable();
            return Ok(new { message = result });
        }

        [HttpPost]
        public IActionResult Register([FromBody] User user)
        {
            string result = _userService.RegisterUser(user);
            return Ok(new { message = result });
        }

        [HttpGet]
        public IActionResult GetUsersByType([FromQuery] string userType)
        {
            var users = _userService.GetUsersByType(userType);
            return Ok(users);
        }
        [HttpPost]
        public IActionResult Login([FromBody] User user)
        {
            var loggedInUser = _userService.LoginUser(user.Email, user.Password);
            if (loggedInUser != null)
                return Ok(loggedInUser);
            return Unauthorized(new { message = "Invalid credentials" });
        }
        [HttpGet]
        public List<User> GetAllUsers()
        {
            var users = _userService.GetAllUsers();
            return users;
        }
    }
}
