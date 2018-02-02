using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ClinicBackend.Models;
using Microsoft.AspNetCore.Hosting;

namespace ClinicBackend.Controllers
{
    [Produces("application/json")]
    [Route("api/clinic")]
    public class ClinicController : Controller
    {
        ClinicContext _clinicContext;
        AdminContext _adminContext;

        public ClinicController(ClinicContext clinicContext, AdminContext adminContext, IHostingEnvironment env)
        {
            _clinicContext = clinicContext;
            _adminContext = adminContext;

            //Add the mock data.
            if (_clinicContext.Clinics.Count() == 0)
            {
                _clinicContext.Clinics.AddRange(new[]
                {
                    new Clinic()
                    {
                        Name = "Clinic",
                        Address = "There",
                        Lat = 43.54f,
                        Lng = -70.33f,
                        WaitTime = 350000,
                        Description = "Long form description goes here."
                    },
                    new Clinic()
                    {
                        Name = "Clinic 2",
                        Address = "Here",
                        Lat = 43.52f,
                        Lng = -70.30f,
                        WaitTime = 350000,
                        Description = "Long form description goes here."
                    }
                });

                _clinicContext.SaveChanges();

                //Create a testing account
                if (env.IsDevelopment())
                {
                    Admin admin = new Admin
                    {
                        UserName = "test",
                        Password = "test"
                    };

                    _adminContext.Add(admin);
                    _adminContext.SaveChanges();
                }
            }
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_clinicContext.Clinics.ToList());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            Clinic clinic = _clinicContext.Clinics.FirstOrDefault((_clinic) => _clinic.Id == id);

            if (clinic == null)
            {
                return NotFound();
            }

            return Ok(clinic);
        }

        [Route("create")]
        [HttpPost]
        public IActionResult CreateClinic([FromBody] Clinic clinic)
        {
            try
            {
                _clinicContext.Add(clinic);
                _clinicContext.SaveChanges();
                return Ok();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return BadRequest();
            }
            
        }
    }
}