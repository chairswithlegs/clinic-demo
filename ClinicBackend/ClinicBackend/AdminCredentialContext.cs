using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClinicBackend
{
    public class AdminCredentialContext : IdentityDbContext
    {
        public AdminCredentialContext(DbContextOptions<AdminCredentialContext> options) : base(options) { }
    }
}
