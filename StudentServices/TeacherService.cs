using Domain.Model;
using Repository;


namespace StudentServices
{
    public class TeacherService
    {
        private readonly TeacherRepository _teacherRepository;

        public TeacherService(TeacherRepository teacherRepository)
        {
            _teacherRepository = teacherRepository;
        }

        public List<Teacher> GetAllTeachers() => _teacherRepository.GetAllTeachers();
        public Teacher GetTeacherById(int id) => _teacherRepository.GetTeacherById(id);
        public string AddTeacher(Teacher teacher) => _teacherRepository.AddTeacher(teacher);
        public string UpdateTeacher(Teacher teacher) => _teacherRepository.UpdateTeacher(teacher);
        public string DeleteTeacher(int id) => _teacherRepository.DeleteTeacher(id);
    
}
}
