using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace TeslaRenting.Migrations
{
    /// <inheritdoc />
    public partial class Initdatabaseforpostgres : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Addresses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Country = table.Column<string>(type: "text", nullable: false),
                    City = table.Column<string>(type: "text", nullable: false),
                    Street = table.Column<string>(type: "text", nullable: false),
                    PostalCode = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Addresses", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TeslaCars",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    DailyRate = table.Column<decimal>(type: "numeric", nullable: false),
                    ImageUrl = table.Column<string>(type: "text", nullable: true),
                    AvailableAt = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TeslaCars", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FirstName = table.Column<string>(type: "text", nullable: false),
                    LastName = table.Column<string>(type: "text", nullable: false),
                    DateOfBirth = table.Column<DateOnly>(type: "date", nullable: true),
                    Email = table.Column<string>(type: "text", nullable: false),
                    Phone = table.Column<string>(type: "text", nullable: false),
                    PasswordHash = table.Column<string>(type: "text", nullable: false),
                    UserAddressId = table.Column<int>(type: "integer", nullable: false),
                    UserRoleId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Users_Addresses_UserAddressId",
                        column: x => x.UserAddressId,
                        principalTable: "Addresses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Users_Roles_UserRoleId",
                        column: x => x.UserRoleId,
                        principalTable: "Roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Reservations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    StartDate = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    EndDate = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    TotalCost = table.Column<decimal>(type: "numeric", nullable: false),
                    TeslaCarId = table.Column<int>(type: "integer", nullable: false),
                    UserId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reservations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Reservations_TeslaCars_TeslaCarId",
                        column: x => x.TeslaCarId,
                        principalTable: "TeslaCars",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Reservations_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Addresses",
                columns: new[] { "Id", "City", "Country", "PostalCode", "Street" },
                values: new object[] { 1, "Krakow", "Poland", "31-154", "Pawia" });

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "User" },
                    { 2, "Employee" },
                    { 3, "Admin" }
                });

            migrationBuilder.InsertData(
                table: "TeslaCars",
                columns: new[] { "Id", "AvailableAt", "DailyRate", "Description", "ImageUrl", "Name" },
                values: new object[,]
                {
                    { 1, "PalmaAirport", 100.00m, "Five-door compact sedan (segment C) equipped with a fully electric drive (can travel approximately 350 km on a single charge), produced since 2017. The model year is 2017, with a 320HP 222kW P60 engine.", null, "Model 3" },
                    { 2, "PalmaAirport", 1200.00m, "Luxury model in the E segment, powered by an electric motor with 1020HP, 750kW of power, capable of traveling approximately 637km on a single charge. Model year 2021. It has 5 doors.", null, "Model S" },
                    { 3, "PalmaAirport", 240.00m, "Built on the Model S platform, the Model X was designed to combine the best features of an SUV and a minivan while maintaining sporty performance. The main feature of the Model X is the upward-lifting rear pair of doors - Falcon Wing Doors. The car is from the 2017 model year, with a 503HP 370kW P100D engine.", null, "Model X" },
                    { 4, "PalmaAirport", 190.00m, "It features a range of up to 507 kilometers on a single charge and all-wheel drive (AWD) with a dual-motor setup. The vehicle accelerates from 0 to 100 km/h in 5 seconds, and its maximum speed is 217 km/h. It's a comfortable 5-door car with a 450HP engine.", null, "Model Y" },
                    { 5, "PalmaCityCenter", 100.00m, "Five-door compact sedan (segment C) equipped with a fully electric drive (can travel approximately 350 km on a single charge), produced since 2017. The model year is 2017, with a 320HP 222kW P60 engine.", null, "Model 3" },
                    { 6, "PalmaCityCenter", 1200.00m, "Luxury model in the E segment, powered by an electric motor with 1020HP, 750kW of power, capable of traveling approximately 637km on a single charge. Model year 2021. It has 5 doors.", null, "Model S" },
                    { 7, "PalmaCityCenter", 240.00m, "Built on the Model S platform, the Model X was designed to combine the best features of an SUV and a minivan while maintaining sporty performance. The main feature of the Model X is the upward-lifting rear pair of doors - Falcon Wing Doors. The car is from the 2017 model year, with a 503HP 370kW P100D engine.", null, "Model X" },
                    { 8, "PalmaCityCenter", 190.00m, "It features a range of up to 507 kilometers on a single charge and all-wheel drive (AWD) with a dual-motor setup. The vehicle accelerates from 0 to 100 km/h in 5 seconds, and its maximum speed is 217 km/h. It's a comfortable 5-door car with a 450HP engine.", null, "Model Y" },
                    { 9, "Alcudia", 100.00m, "Five-door compact sedan (segment C) equipped with a fully electric drive (can travel approximately 350 km on a single charge), produced since 2017. The model year is 2017, with a 320HP 222kW P60 engine.", null, "Model 3" },
                    { 10, "Alcudia", 1200.00m, "Luxury model in the E segment, powered by an electric motor with 1020HP, 750kW of power, capable of traveling approximately 637km on a single charge. Model year 2021. It has 5 doors.", null, "Model S" },
                    { 11, "Alcudia", 240.00m, "Built on the Model S platform, the Model X was designed to combine the best features of an SUV and a minivan while maintaining sporty performance. The main feature of the Model X is the upward-lifting rear pair of doors - Falcon Wing Doors. The car is from the 2017 model year, with a 503HP 370kW P100D engine.", null, "Model X" },
                    { 12, "Alcudia", 190.00m, "It features a range of up to 507 kilometers on a single charge and all-wheel drive (AWD) with a dual-motor setup. The vehicle accelerates from 0 to 100 km/h in 5 seconds, and its maximum speed is 217 km/h. It's a comfortable 5-door car with a 450HP engine.", null, "Model Y" },
                    { 13, "Manacor", 100.00m, "Five-door compact sedan (segment C) equipped with a fully electric drive (can travel approximately 350 km on a single charge), produced since 2017. The model year is 2017, with a 320HP 222kW P60 engine.", null, "Model 3" },
                    { 14, "Manacor", 1200.00m, "Luxury model in the E segment, powered by an electric motor with 1020HP, 750kW of power, capable of traveling approximately 637km on a single charge. Model year 2021. It has 5 doors.", null, "Model S" },
                    { 15, "Manacor", 240.00m, "Built on the Model S platform, the Model X was designed to combine the best features of an SUV and a minivan while maintaining sporty performance. The main feature of the Model X is the upward-lifting rear pair of doors - Falcon Wing Doors. The car is from the 2017 model year, with a 503HP 370kW P100D engine.", null, "Model X" },
                    { 16, "Manacor", 190.00m, "It features a range of up to 507 kilometers on a single charge and all-wheel drive (AWD) with a dual-motor setup. The vehicle accelerates from 0 to 100 km/h in 5 seconds, and its maximum speed is 217 km/h. It's a comfortable 5-door car with a 450HP engine.", null, "Model Y" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "DateOfBirth", "Email", "FirstName", "LastName", "PasswordHash", "Phone", "UserAddressId", "UserRoleId" },
                values: new object[] { 1, new DateOnly(1999, 6, 21), "oskar@test.com", "Oskar", "Michalski", "$2b$10$ZvG8nLlDm4CvOxbdxyL8BuMGT7wb1DI5zuDKaApckHYXq2TVZbcuO", "123123123", 1, 3 });

            migrationBuilder.CreateIndex(
                name: "IX_Reservations_TeslaCarId",
                table: "Reservations",
                column: "TeslaCarId");

            migrationBuilder.CreateIndex(
                name: "IX_Reservations_UserId",
                table: "Reservations",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_UserAddressId",
                table: "Users",
                column: "UserAddressId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_UserRoleId",
                table: "Users",
                column: "UserRoleId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Reservations");

            migrationBuilder.DropTable(
                name: "TeslaCars");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Addresses");

            migrationBuilder.DropTable(
                name: "Roles");
        }
    }
}
