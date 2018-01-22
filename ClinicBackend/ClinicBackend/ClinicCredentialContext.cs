using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClinicBackend
{
    public class ClinicCredentialContext : IdentityDbContext
    {
        public ClinicCredentialContext(DbContextOptions<ClinicCredentialContext> options) : base(options) { }
    }
}
