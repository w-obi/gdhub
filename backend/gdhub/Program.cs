using gdhub.Data;
using gdhub.Endpoints;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddValidation();
builder.AddgdhubContext();

var app = builder.Build();

app.MapMiniGameEndpoints();
app.MapFullGameEndpoints();
app.MapAdminEndpoints();

app.MigrateDb();
app.Run();
