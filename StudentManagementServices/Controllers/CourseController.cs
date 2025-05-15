using Domain.Model;
using Microsoft.AspNetCore.Mvc;
using StudentServices;

namespace StudentManagementServices.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CourseController : Controller
    {
        private readonly CourseService _courseService;

        public CourseController(CourseService courseService)
        {
            _courseService = courseService;
        }

        [HttpGet]
        public List<Course> GetAllCourses() => _courseService.GetAllCourses();

        [HttpGet("{id}")]
        public Course GetCourseById(int id) => _courseService.GetCourseById(id);

        [HttpPost]
        public IActionResult AddCourse([FromBody] Course course)
        {
            return CreatedAtAction(nameof(AddCourse), new { id = course.CourseID }, new { res = _courseService.AddCourse(course) });
        }

        [HttpPut]
        public IActionResult UpdateCourse([FromBody] Course course) => Ok(new { response = _courseService.UpdateCourse(course)});

        [HttpDelete("{id}")]
        public IActionResult DeleteCourse(int id) => Ok(new { response = _courseService.DeleteCourse(id) });
    }
}
