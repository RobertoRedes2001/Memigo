using MemigoAPI.Model;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddSingleton<MemigoV1Context>();
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "MyCors", builder => {
        builder.AllowAnyOrigin().AllowAnyMethod();
    });
});
var app = builder.Build();
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();