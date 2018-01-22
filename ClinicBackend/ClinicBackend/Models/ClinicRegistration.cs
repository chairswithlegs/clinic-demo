using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClinicBackend.Models
{
    public class ClinicRegistration
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public float lat { get; set; }
        public float lng { get; set; }
        public int WaitTime { get; set; }
        public string Description { get; set; }
    }
}
