using MemigoAPI.Model;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers().AddJsonOptions(
    x => x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles
); 
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