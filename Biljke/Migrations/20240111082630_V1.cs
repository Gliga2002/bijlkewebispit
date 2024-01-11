using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Biljke.Migrations
{
    /// <inheritdoc />
    public partial class V1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Biljke",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Slika = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Biljke", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "NepoznateBiljke",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NepoznateBiljke", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Osobine",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Vrednost = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Osobine", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Podrucja",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Podrucja", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "BiljkaOsobina",
                columns: table => new
                {
                    BiljkeID = table.Column<int>(type: "int", nullable: false),
                    OsobineID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BiljkaOsobina", x => new { x.BiljkeID, x.OsobineID });
                    table.ForeignKey(
                        name: "FK_BiljkaOsobina_Biljke_BiljkeID",
                        column: x => x.BiljkeID,
                        principalTable: "Biljke",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BiljkaOsobina_Osobine_OsobineID",
                        column: x => x.OsobineID,
                        principalTable: "Osobine",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "NepoznataBiljkaOsobina",
                columns: table => new
                {
                    NepoznateBiljkeID = table.Column<int>(type: "int", nullable: false),
                    OsobineID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NepoznataBiljkaOsobina", x => new { x.NepoznateBiljkeID, x.OsobineID });
                    table.ForeignKey(
                        name: "FK_NepoznataBiljkaOsobina_NepoznateBiljke_NepoznateBiljkeID",
                        column: x => x.NepoznateBiljkeID,
                        principalTable: "NepoznateBiljke",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_NepoznataBiljkaOsobina_Osobine_OsobineID",
                        column: x => x.OsobineID,
                        principalTable: "Osobine",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Vidjenja",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Latitude = table.Column<double>(type: "float", nullable: false),
                    Longitude = table.Column<double>(type: "float", nullable: false),
                    DatumIVreme = table.Column<DateTime>(type: "datetime2", nullable: false),
                    BiljkaID = table.Column<int>(type: "int", nullable: true),
                    PodrucjeID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vidjenja", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Vidjenja_Biljke_BiljkaID",
                        column: x => x.BiljkaID,
                        principalTable: "Biljke",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_Vidjenja_Podrucja_PodrucjeID",
                        column: x => x.PodrucjeID,
                        principalTable: "Podrucja",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateIndex(
                name: "IX_BiljkaOsobina_OsobineID",
                table: "BiljkaOsobina",
                column: "OsobineID");

            migrationBuilder.CreateIndex(
                name: "IX_NepoznataBiljkaOsobina_OsobineID",
                table: "NepoznataBiljkaOsobina",
                column: "OsobineID");

            migrationBuilder.CreateIndex(
                name: "IX_Vidjenja_BiljkaID",
                table: "Vidjenja",
                column: "BiljkaID");

            migrationBuilder.CreateIndex(
                name: "IX_Vidjenja_PodrucjeID",
                table: "Vidjenja",
                column: "PodrucjeID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BiljkaOsobina");

            migrationBuilder.DropTable(
                name: "NepoznataBiljkaOsobina");

            migrationBuilder.DropTable(
                name: "Vidjenja");

            migrationBuilder.DropTable(
                name: "NepoznateBiljke");

            migrationBuilder.DropTable(
                name: "Osobine");

            migrationBuilder.DropTable(
                name: "Biljke");

            migrationBuilder.DropTable(
                name: "Podrucja");
        }
    }
}
