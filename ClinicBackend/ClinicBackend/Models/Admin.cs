using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ClinicBackend.Models
{
    public class Admin : IdentityUser
    {
        public string Password { get; set; }
    }
}
