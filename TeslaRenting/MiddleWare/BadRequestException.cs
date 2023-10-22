namespace TeslaRenting.MiddleWare;

public class BadRequestException : System.Exception
{
    public BadRequestException(string message) : base(message)
    {
        
    }
}