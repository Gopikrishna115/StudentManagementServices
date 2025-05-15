using System.Collections.Generic;
using Domain.Model;
using StudentManagementSystemAPI.Repository;


namespace StudentManagementSystemAPI.ServiceContract
{
    public interface IStudentRepository
    {
        public List<Student> GetAllStudents();
        public List<Student> GetStudentById(int id);
        public string AddStudent(Student student);

        public string UpdateStudent(Student student);

        public string DeleteStudent(int id);
        List<Attendance> GetAttendance(int? studentId = null, int? courseId = null, DateTime? attendanceDate = null);
        string AddAttendance(Attendance attendance);

    }

}
