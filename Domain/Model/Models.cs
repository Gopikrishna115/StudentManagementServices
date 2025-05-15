using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Model
{
    public class Student
    {
        [Key]
        public int StudentID { get; set; }

        [Required, MaxLength(100)]
        public string Name { get; set; }

        [Required, EmailAddress, MaxLength(100)]
        public string Email { get; set; }

        public List<int> Courses { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    public class Attendance
    {
        [Key]
        public int AttendanceID { get; set; }

        [Required, ForeignKey("Student")]
        public int StudentID { get; set; }

        [Required, ForeignKey("Course")]
        public int CourseID { get; set; }

        [Required]
        public DateTime AttendanceDate { get; set; }

        [Required, MaxLength(10)]
        public string Status { get; set; } 

        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    }

    public class Teacher
    {
        [Key]
        public int TeacherID { get; set; }

        [Required, MaxLength(100)]
        public string Name { get; set; }

        [Required, EmailAddress, MaxLength(100)]
        public string Email { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    public class Course
    {
        [Key]
        public int CourseID { get; set; }

        [Required, MaxLength(100)]
        public string CourseName { get; set; }

        [Required, ForeignKey("Teacher")]
        public int TeacherID { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    }
}
