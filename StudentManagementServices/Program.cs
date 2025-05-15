using DataBase;
using Repository;
using StudentManagementSystemAPI.Repository;
using StudentManagementSystemAPI.ServiceContract;
using StudentManagementSystemAPI.Services;
using StudentServices;


var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp",
        policy =>
        {
            policy.AllowAnyOrigin() // Update with your Angular URL
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        });
});

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<IDatabaseContext,DatabaseContext>();
builder.Services.AddScoped<IStudentRepository, StudentRepository>();
builder.Services.AddScoped<IStudentService, StudentService>();

builder.Services.AddTransient<CourseRepository>();
builder.Services.AddTransient<CourseService>();
builder.Services.AddTransient<TeacherRepository>();
builder.Services.AddTransient<TeacherService>();
builder.Services.AddScoped<LoginRepository>();
builder.Services.AddScoped<UserService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAngularApp");

app.UseAuthorization();

app.MapControllers();

app.Run();
