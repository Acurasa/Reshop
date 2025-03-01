using System.Net;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;

namespace API.Middleware;

public class ExceptionMiddleware : IMiddleware
{
    IHostEnvironment _env;
    ILogger<ExceptionMiddleware> _logger;

    public ExceptionMiddleware(IHostEnvironment env, ILogger<ExceptionMiddleware> logger)
    {
        _env = env;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        try
        {
            await next(context);
        }
        catch (Exception ex)
        {
            await HandleException(context, ex);
            throw;
        }
    }

    private async Task HandleException(HttpContext context, Exception exception)
    {
        _logger.LogError(exception, exception.Message);
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

        var response = new ProblemDetails
        {
            Status = 500,
            Detail = _env.IsDevelopment() ? exception.StackTrace : null,
            Title = exception.Message,
        };

        var options = new JsonSerializerOptions                                                                             
            {PropertyNamingPolicy = JsonNamingPolicy.CamelCase};
        
        await context.Response.WriteAsync(JsonSerializer.Serialize(response, options));
    }
}