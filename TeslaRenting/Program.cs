using Microsoft.EntityFrameworkCore;
using TeslaRenting.Entity;
using TeslaRenting.MiddleWare;
using TeslaRenting.Service;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddDbContext<TeslaRentingDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("TeslaRentingDatabase")));

builder.Services.AddControllers();

builder.Services.AddScoped<IReservationService, ReservationService>();

builder.Services.AddScoped<ErrorHandlingMiddleware>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAutoMapper(typeof(Program).Assembly);






var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseMiddleware<ErrorHandlingMiddleware>();
app.UseHttpsRedirection();
app.UseAuthorization();
app.UseSwagger();
app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Tesla Renting API"));
app.UseRouting();

app.MapControllers();

app.Run();