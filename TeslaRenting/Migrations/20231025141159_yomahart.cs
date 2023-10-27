using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TeslaRenting.Migrations
{
    /// <inheritdoc />
    public partial class yomahart : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "PasswordHash",
                value: "$2b$10$n54P7PVEM/AELQkOL/xDxuvKPIFmtIFGVOP4W9A8n9TMPCyuxnuHS");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "PasswordHash",
                value: "$2b$10$tH4QDf1VP3MFUURLX7bP0.hnr4zelhDhFCVoqmXHeDGoRncKHAX2.");
        }
    }
}
