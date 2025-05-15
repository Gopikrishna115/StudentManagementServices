using System.Collections.Generic;
using StudentManagementSystemAPI.Models;

namespace StudentManagementSystemAPI.Repository
{
    public interface IStudentRepository
    {
        IEnumerable<Student> GetAllStudents();
        Student GetStudentById(int id);
        void AddStudent(Student student);
        void UpdateStudent(int id, Student student);
        void DeleteStudent(int id);
    }
}
