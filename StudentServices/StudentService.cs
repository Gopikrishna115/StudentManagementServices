using Domain.Model;
using StudentManagementSystemAPI.ServiceContract;
using StudentManagementSystemAPI.Services;



public class StudentService : IStudentService
{
    private readonly IStudentRepository _studentRepository;

    public StudentService(IStudentRepository studentRepository)
    {
        _studentRepository = studentRepository;
    }


    public List<Student> GetAllStudents() => _studentRepository.GetAllStudents();
    public List<Student> GetStudentById(int id) => _studentRepository.GetStudentById(id);
    public string AddStudent(Student student) => _studentRepository.AddStudent(student);
    public string UpdateStudent(Student student) => _studentRepository.UpdateStudent(student);
    public string DeleteStudent(int id) => _studentRepository.DeleteStudent(id);

    public string AddAttendance(Attendance attendance) => _studentRepository.AddAttendance(attendance);

    public List<Attendance> GetAttendance(int? studentId = null, int? courseId = null, DateTime? attendanceDate = null) => _studentRepository.GetAttendance(studentId, courseId, attendanceDate);
}
