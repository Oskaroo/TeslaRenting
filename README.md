# Project Documentation: TeslaRenting

## Project Description
This is a web application designed to handle the rental of Tesla cars in Majorca. It offers a wide range of features related to users, reservations, and cars, accessible through both a Web API interface and a website. Users can register, log in, create reservations, and browse available rental locations and car models.

## Technologies Used in the Project

### Back-End
In the Back-End part, written in C# using ASP.NET, the following technologies were used:
- AutoMapper
- JWT Bearer
- BCrypt
- FluentValidation
- NLog
- SQL

### Front-End
The Front-End part is built using React and leverages the following technologies:
- Axios
- React-Router-Dom

## Project Directory and File Structure

### Backend (TeslaRenting)
- **Controllers**
  - ReservationController.cs
  - TeslaCarController.cs
  - UserController.cs
- **Authorization**
  - MinimumAgeRequirement.cs
- **Handler**
  - MinimumAgeRequirementHandler.cs
- **Data**
  - **Entity**
    - Address.cs
    - Reservation.cs
    - Role.cs
    - TeslaCar.cs
    - TeslaRentingDbContext.cs
    - User.cs
  - **Enum**
    - Availability.cs
  - **MappingProfile**
    - TeslaRatingMappingProfile.cs
  - **Model**
    - AssignRoleDto.cs
    - CreateReservationDto.cs
    - CreateTeslaCarDto.cs
    - LoginDto.cs
    - RegisterUserDto.cs
    - ReservationDto.cs
    - TeslaCarDto.cs
    - UpdateReservationDto.cs
    - UpdateTeslaCarDto.cs
    - UserDto.cs
    - **Authenticator**
      - AuthenticationSettings.cs
    - **Validator**
      - RegisterUserDtoValidator.cs
- **Exception**
  - BadRequestException.cs
  - NotFoundException.cs
  - TimeOutException.cs
- **Middleware**
  - ErrorHandlingMiddleware.cs
  - RequestTimeMiddleware.cs
- **Service**
  - ReservationService.cs
  - TeslaCarService.cs
  - UserService.cs
  - **Interface**
    - IReservationService.cs
    - ITeslaCarService.cs
    - IUserService.cs
- Program.cs
- TeslaRenting.csproj
- addressSeed.json
- appsettings.Development.json
- appsettings.json
- nlog.config
- roleSeed.json
- teslaCarSeed.json
- userSeed.json

### Frontend (TeslaRenting/UI/tesla-renting-ui)
- **public**
- **src**
  - App.js
  - CarDetails.js
  - CarList.js
  - Create.js
  - Home.js
  - Navbar.js
  - NotFound.js
  - UseFetch.js
  - index.css
  - index.js
  - **Api**
    - apiCalls.js
  - **photos**
    - teslaphoto.jpg

## Data Model
The data structure is as follows:

![Data Structure](https://github.com/Oskaroo/BookstoreMVC/assets/106118915/aef17d68-7a01-4e8c-9a19-af81c73bde6f)

The tables are constructed based on the following models:
- Address.cs
- Reservation.cs
- Role.cs
- TeslaCar.cs
- User.cs

## API Endpoints

The API endpoints are divided into three parts:

### Reservation
![Reservation Endpoints](https://github.com/Oskaroo/BookstoreMVC/assets/106118915/6da51818-694b-4355-833e-c5ba1f5e2336)

### TeslaCar
![TeslaCar Endpoints](https://github.com/Oskaroo/BookstoreMVC/assets/106118915/6ea66061-ed5f-4b10-9cf2-a6a3c362da81)

### User
![User Endpoints](https://github.com/Oskaroo/BookstoreMVC/assets/106118915/9ddfa5b0-9ab1-4a6d-8728-18112e1827d0)

## Security

To ensure user security, after registration, passwords are hashed using BCrypt and stored in a hashed form in the database.

![Password Hashing Process](https://github.com/Oskaroo/BookstoreMVC/assets/106118915/9f938d54-12bd-454b-878f-16299d3eea98)

## Running Instructions

To run this project, follow these steps:

### Back-End

1. Start the Back-End part first, which runs on `localhost:5001/`. Ensure you have the necessary dependencies and tools, such as the Microsoft .NET SDK, installed on your computer.

2. Navigate to the Back-End project directory in the command prompt or terminal.

3. Run the Back-End by entering the command `dotnet run`. The application will be launched at `localhost:5001/`.

### Front-End

4. Next, start the Front-End part. Navigate to the Front-End project directory in the command prompt or terminal.

5. Install project dependencies by running the command `npm install`.

6. Launch the Front-End by entering the command `npm start`. The application will be accessible at the appropriate URL.

These are the basic steps to run the project. Make sure you have all the required dependencies installed before running the application.

## Basic Login Data

To avoid access issues, it is recommended to log in with the pre-seeded user with the following data:

- **Email**: "oskar@test.com"
- **Password**: "test123"

This user has administrative privileges, allowing access to all application functions.

