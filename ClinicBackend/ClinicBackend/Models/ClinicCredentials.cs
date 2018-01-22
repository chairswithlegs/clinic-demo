using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace ClinicBackend.Models
{
    public class ClinicCredentials : IdentityUser
    {
        [StringLength(20)]
        [Key]
        public string Username { get; set; }
        public string Password { get; set; }
        public int ClinicId { get; set; }
    }
}
