using gdhub.Data;
using gdhub.Endpoints;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddValidation();
builder.AddgdhubContext();

var app = builder.Build();

app.MapAuthEndpoints();
app.MapGameEndpoints();
app.MapAdminEndpoints();

app.MigrateDb();
app.Run();
//dotnet ef migrations add InitialCreate
//dotnet ef migrations add InitialPostgres