using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ClinicBackend.Models;

namespace ClinicBackend
{
    public class ClinicContext : DbContext
    {
        public ClinicContext(DbContextOptions<ClinicContext> options): base(options) { }

        public DbSet<Clinic> Clinics { get; set; }
    }
}
