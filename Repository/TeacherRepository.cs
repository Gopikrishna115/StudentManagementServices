using DataBase;
using Domain.Model;
using System.Collections.Generic;
using System.Linq;

namespace Repository
{
    public class TeacherRepository
    {
        private readonly IDatabaseContext _dbContext;

        public TeacherRepository(IDatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }

        public List<Teacher> GetAllTeachers()
        {
            string query = "SELECT teacherid, name, email, createdat FROM teacher";
            return _dbContext.GetQuery<Teacher>(query);
        }

        public Teacher GetTeacherById(int id)
        {
            string query = $"SELECT teacherid, name, email, createdat FROM teacher WHERE teacherid = {id}";
            return _dbContext.GetQuery<Teacher>(query).FirstOrDefault();
        }

        public string AddTeacher(Teacher teacher)
        {
            string query = $"INSERT INTO teacher (name, email) " +
                           $"VALUES ('{teacher.Name}', '{teacher.Email}')";
            return _dbContext.ExecuteQuery(query);
        }

        public string UpdateTeacher(Teacher teacher)
        {
            string query = $"UPDATE teacher SET name = '{teacher.Name}', email = '{teacher.Email}' " +
                           $"WHERE teacherid = {teacher.TeacherID}";
            return _dbContext.ExecuteQuery(query);
        }

        public string DeleteTeacher(int id)
        {
            string query = $"DELETE FROM teacher WHERE teacherid = {id}";
            return _dbContext.ExecuteQuery(query);
        }
    }
}
