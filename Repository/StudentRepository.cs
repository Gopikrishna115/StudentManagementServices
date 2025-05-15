using System.Collections.Generic;
using System.Linq;
using Domain.Model;
using StudentManagementSystemAPI.ServiceContract;
using DataBase;

namespace StudentManagementSystemAPI.Repository
{
    public class StudentRepository : IStudentRepository
    {
        private readonly IDatabaseContext _dbContext;

        public StudentRepository(IDatabaseContext context)
        {
            _dbContext = context;
        }

        public List<Student> GetAllStudents()
        {
            string query = "SELECT studentid, name, email, courses, createdat FROM student ORDER BY studentid ASC";
            return _dbContext.GetQuery<Student>(query);
        }

        public List<Student> GetStudentById(int id)
        {
            string query = $"SELECT studentid, name, email, courses, createdat " +
                           $"FROM student WHERE {id} = ANY(courses)";

            return _dbContext.GetQuery<Student>(query); 
        }

        public string AddStudent(Student student)
        {
            
            string courseIdsArray = student.Courses != null && student.Courses.Any()
                ? $"'{{{string.Join(",", student.Courses)}}}'" 
                : "NULL";

            string query = $"INSERT INTO student (name, email, courses) " +
                           $"VALUES ('{student.Name}', '{student.Email}', {courseIdsArray})";

            return _dbContext.ExecuteQuery(query);
        }


        public string UpdateStudent(Student student)
        {
            string courseIdsArray = student.Courses != null && student.Courses.Any()
                ? $"'{{{string.Join(",", student.Courses)}}}'" 
                : "NULL";

            string query = $"UPDATE student SET " +
                           $"name = '{student.Name}', " +
                           $"email = '{student.Email}', " +
                           $"courses = {courseIdsArray} " +
                           $"WHERE studentid = {student.StudentID}";

            return _dbContext.ExecuteQuery(query);
        }

        public string DeleteStudent(int id)
        {
            string query = $"DELETE FROM student WHERE studentid = {id}";
            return _dbContext.ExecuteQuery(query);
        }

        public string AddAttendance(Attendance attendance)
        {
            string query = $"INSERT INTO attendance (studentid, courseid, attendancedate, status, createdat) " +
                           $"VALUES ({attendance.StudentID}, {attendance.CourseID}, '{attendance.AttendanceDate:yyyy-MM-dd}', '{attendance.Status}', '{attendance.CreatedAt:yyyy-MM-dd HH:mm:ss}')";

            return _dbContext.ExecuteQuery(query);
        }


        public List<Attendance> GetAttendance(int? studentId=null, int? courseId = null, DateTime? attendanceDate = null)
        {
            string query = $"SELECT * FROM attendance WHERE  attendanceid is not null";
            if(studentId != null)
            {
                query += $" AND studentid = {studentId.Value}";
            }
            if (courseId.HasValue)
            {
                query += $" AND courseid = {courseId.Value}";
            }

            if (attendanceDate.HasValue)
            {
                query += $" AND attendancedate::DATE = '%{attendanceDate.Value:yyyy-MM-dd}%'";
            }

            return _dbContext.GetQuery<Attendance>(query);
        }


    }
}
