using DataBase;
using Domain.Model;
using System.Collections.Generic;
using System.Linq;

namespace Repository
{
    public class CourseRepository
    {
        private readonly IDatabaseContext _dbContext;

        public CourseRepository(IDatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }

        public List<Course> GetAllCourses()
        {
            string query = "SELECT courseid, coursename, teacherid, createdat FROM course";
            return _dbContext.GetQuery<Course>(query);
        }

        public Course GetCourseById(int id)
        {
            string query = $"SELECT courseid, coursename, teacherid, createdat " +
                           $"FROM course WHERE courseid = {id}";

            return _dbContext.GetQuery<Course>(query).FirstOrDefault();
        }

        public string AddCourse(Course course)
        {
            string query = $"INSERT INTO course (coursename, teacherid) " +
                           $"VALUES ('{course.CourseName}', {course.TeacherID})";

            return _dbContext.ExecuteQuery(query);
        }

        public string UpdateCourse(Course course)
        {
            string query = $"UPDATE course SET " +
                           $"coursename = '{course.CourseName}', " +
                           $"teacherid = {course.TeacherID} " +
                           $"WHERE courseid = {course.CourseID}";

            return _dbContext.ExecuteQuery(query);
        }

        public string DeleteCourse(int id)
        {
            string query = $"DELETE FROM course WHERE courseid = {id}";
            return _dbContext.ExecuteQuery(query);
        }
    }
}
