﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClinicBackend.Models
{
    public class Clinic
    {
        public string Name { get; set; }
        public string Address { get; set; }
        public int Id { get; set; }
        public float lat { get; set; }
        public float lng { get; set; }
        public int WaitTime { get; set; }
        public string Description { get; set; }
    }
}
