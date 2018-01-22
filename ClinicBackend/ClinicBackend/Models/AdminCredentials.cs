using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ClinicBackend.Models
{
    public class AdminCredentials : IdentityUser
    {
        [StringLength(20)]
        [Key]
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
