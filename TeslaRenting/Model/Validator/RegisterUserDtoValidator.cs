using FluentValidation;
using TeslaRenting.Entity;

namespace TeslaRenting.Model.Validator;

public class RegisterUserDtoValidator : AbstractValidator<RegisterUserDto>
{
    public RegisterUserDtoValidator(TeslaRentingDbContext dbContext)
    {
        RuleFor(x => x.Email)
            .NotEmpty()
            .EmailAddress();
        RuleFor(x => x.Password)
            .MinimumLength(6);
        RuleFor(x => x.ConfirmPassword)
            .Equal(e => e.Password);
        RuleFor(x => x.Email).Custom((value, context) =>
        {
            var emailInuse = dbContext.Users.Any(u => u.Email == value);
            if (emailInuse)
            {
                context.AddFailure("Email", "That email is taken");
            }
        });
    }
}