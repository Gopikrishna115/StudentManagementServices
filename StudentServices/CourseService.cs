using Domain.Model;
using Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudentServices
{
    public class CourseService
    {
        private readonly CourseRepository _courseRepository;

        public CourseService(CourseRepository courseRepository)
        {
            _courseRepository = courseRepository;
        }
        public List<Course> GetAllCourses() => _courseRepository.GetAllCourses();
        public Course GetCourseById(int id) => _courseRepository.GetCourseById(id);
        public string AddCourse(Course course) => _courseRepository.AddCourse(course);
        public string UpdateCourse(Course course) => _courseRepository.UpdateCourse(course);
        public string DeleteCourse(int id) => _courseRepository.DeleteCourse(id);
    }
}
