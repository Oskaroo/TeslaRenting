using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TeslaRenting.Migrations
{
    /// <inheritdoc />
    public partial class Init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "PasswordHash",
                value: "$2b$10$feSWfabScrp4gYfwtd0uU.pwJf4Dbbi6HI1Coo5V73G/rqWiwKQ5C");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "PasswordHash",
                value: "$2b$10$TE7fZa0q0H90LrKgf3uFb.WSCgdlLpmPozxTtA.nppTlUN3Wiv1lO");
        }
    }
}
