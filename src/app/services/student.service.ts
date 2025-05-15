import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';


export interface Student {
  studentID?: number; 
  name: string;
  age: number;
  email: string;
  courses?: number[]; 
}

export interface Teacher {
  teacherID?: number;
  name: string;
  email: string;
  createdAt?: string;
}


export interface Course {
  courseID : number,
  courseName : string,
  createdAt: Date,
  teacherID:number
}

export interface Attendance{
    attendanceID: number,
    studentID: number,
    courseID: number,
    attendanceDate: Date,
    status: string,
    createdAt: Date
}

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  usertype = new BehaviorSubject<string>(localStorage.getItem('UserType')||"");
 
  
  private studentUrl = 'http://localhost:5188/api/Student';
  private courseUrl = 'http://localhost:5188/api/Course';
  private teacherurl= 'http://localhost:5188/api/Teacher';
  constructor(private http: HttpClient) {
 
  }


  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.studentUrl}/GetStudents`);
  }
  getStudentbyCId(courseId:number): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.studentUrl}/GetStudentById?id=${courseId}`,);
  }
  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(`${this.studentUrl}/AddStudent`, student);
  }

  updateStudent(student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.studentUrl}/UpdateStudent`, student);
  }

  deleteStudent(studentID: number): Observable<string> {
    return this.http.delete<string>(`${this.studentUrl}/DeleteStudent?id=${studentID}`);
  }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.courseUrl+'/GetAllCourses');
  }
  addCourse(newCourse: Course) : Observable<Course[]>{
    return this.http.post<Course[]>(this.courseUrl+'/AddCourse',newCourse);
  }

  deleteCourse(courseID: number): Observable<void> {
    return this.http.delete<void>(`${this.courseUrl}/DeleteCourse/${courseID}`);
  }
  updateCourse(course: Course): Observable<void> {
    return this.http.put<void>(`${this.courseUrl}/UpdateCourse`, course);
  }

  getCourseById(courseID: number): Observable<Course> {
    return this.http.get<Course>(`${this.courseUrl}/GetCourseById/${courseID}`);
  }
  getTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(this.teacherurl+'/GetAllTeachers');
  }

  getTeacher(id: number): Observable<Teacher> {
    return this.http.get<Teacher>(`${this.teacherurl}/GetTeacherById/${id}`);
  }

  addTeacher(teacher: Teacher): Observable<Teacher> {
    return this.http.post<Teacher>(this.teacherurl+'/AddTeacher', teacher);
  }

  updateTeacher(teacher: Teacher): Observable<Teacher> {
    return this.http.put<Teacher>(`${this.teacherurl}/UpdateTeacher`, teacher);
  }

  
  deleteTeacher(id: number): Observable<void> {
    return this.http.delete<void>(`${this.teacherurl}/DeleteTeacher/${id}`);
  }

  saveAttendance( attedances:Attendance[]): Observable<any>{
      return this.http.post(this.studentUrl+'/SaveAttendance',attedances);
  }

  getAttendance(studentId?: number, courseId?: number, attendanceDate?: string): Observable<any> {
    let queryParams = [];
 
    if (studentId) queryParams.push(`studentId=${studentId}`);
    if (courseId) queryParams.push(`courseId=${courseId}`);
    if (attendanceDate) queryParams.push(`attendanceDate=${attendanceDate}`);

    const queryString = queryParams.length ? `?${queryParams.join('&')}` : '';

    return this.http.get(`${this.studentUrl}/GetAttendance${queryString}`);
}

}
