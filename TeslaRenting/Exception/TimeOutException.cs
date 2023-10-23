namespace TeslaRenting.Exception;

public class TimeOutException:System.Exception
{
    public TimeOutException(string message) : base(message)
    {
        
    }
}