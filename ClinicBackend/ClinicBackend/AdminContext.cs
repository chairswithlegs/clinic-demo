using ClinicBackend.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClinicBackend
{
    /// <summary>
    /// Entity context for the Identity Framework database.
    /// </summary>
    public class AdminContext : IdentityDbContext
    {
        public AdminContext(DbContextOptions<AdminContext> options) : base(options) { }

        public DbSet<Admin> Admin { get; set; }
    }
}
