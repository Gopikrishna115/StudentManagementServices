using Domain.Model;
using Microsoft.AspNetCore.Mvc;
using StudentServices;

namespace StudentManagementServices.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class TeacherController : Controller
    {
        private readonly TeacherService _teacherService;

        public TeacherController(TeacherService teacherService)
        {
            _teacherService = teacherService;
        }

        [HttpGet]
        public List<Teacher> GetAllTeachers()
        {
            return _teacherService.GetAllTeachers();
        }

        [HttpGet("{id}")]
        public Teacher GetTeacherById(int id)
        {
            var teacher = _teacherService.GetTeacherById(id);
            return teacher;
        }

        [HttpPost]
        public IActionResult AddTeacher([FromBody] Teacher teacher)
        {
            return CreatedAtAction(nameof(AddTeacher), new { id = teacher.TeacherID },new { res = _teacherService.AddTeacher(teacher)});
        }

        [HttpPut]
        public IActionResult UpdateTeacher([FromBody] Teacher teacher)
        {
            return Ok(new { response = _teacherService.UpdateTeacher(teacher) });
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTeacher(int id)
        {
            return Ok(new { response = _teacherService.DeleteTeacher(id) });
        }
    }
}
