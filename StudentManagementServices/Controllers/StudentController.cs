
using Microsoft.AspNetCore.Mvc;
using Domain.Model;
using StudentManagementSystemAPI.Services;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Xml.Linq;

namespace StudentManagementSystemAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly IStudentService _studentService;

        public StudentController(IStudentService studentService)
        {
            _studentService = studentService;
        }
        [HttpPost]
        public IActionResult AddStudent(Student student)
        {

            try
            {
                string result = _studentService.AddStudent(student);

                return Ok(new { message = "Query Executed Successfully", success = true });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Error updating student", error = ex.Message });
            }
        }

        [HttpPut]
        [HttpPut("UpdateStudent")]
        public IActionResult UpdateStudent([FromBody] Student student)
        {
            try
            {
                string result = _studentService.UpdateStudent(student);

                // Return a proper JSON response
                return Ok(new { message = "Query Executed Successfully", success = true });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Error updating student", error = ex.Message });
            }
        }

        [HttpGet]
        public List<Student> GetStudents()
        {
            return _studentService.GetAllStudents();
        }
        [HttpGet]
        public List<Student> GetStudentById(int id)
        {
            return _studentService.GetStudentById(id);
        }

        [HttpDelete()]
        public IActionResult DeleteStudent(int id)
        {
            var result = _studentService.DeleteStudent(id);

            if (result != "")
            {
                return Ok(new { message = "Student deleted successfully" });
            }
            else
            {
                return NotFound(new { message = "Student not found" });
            }
        }

        [HttpGet]
        public List<Attendance> GetAttendance(int? studentId = null, int? courseId = null, DateTime? attendanceDate = null)
        {
            return _studentService.GetAttendance(studentId, courseId, attendanceDate);
        }

        [HttpPost]
        public IActionResult AddAttendance(Attendance attendance)
        {
            try
            {
                string result = _studentService.AddAttendance(attendance);

                return Ok(new { message = "Query Executed Successfully", success = true });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Error Adding Attendance", error = ex.Message });
            }
        }

        [HttpPost]
        public IActionResult SaveAttendance(List<Attendance> attendances)
        {
            try
            {
                foreach (var item in attendances)
                {
                    try
                    {
                        string result = _studentService.AddAttendance(item);
                    }
                    catch 
                    {
                    }
                }
                return Ok(new { message = "Query Executed Successfully", success = true });
            }
            catch(Exception ex)
            {

                return BadRequest(new { message = "Error Adding Attendance", error = ex.Message });
            }

        }

    }
}
