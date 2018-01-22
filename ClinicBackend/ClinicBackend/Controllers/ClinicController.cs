using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ClinicBackend.Models;


namespace ClinicBackend.Controllers
{
    [Produces("application/json")]
    [Route("api/clinic")]
    public class ClinicController : Controller
    {
        ClinicContext _clinicContext;
        ClinicCredentialContext _credentialContext;

        public ClinicController(ClinicContext clinicContext, ClinicCredentialContext credentialContext)
        {
            _clinicContext = clinicContext;
            _credentialContext = credentialContext;

            //Add the mock data.
            if (_clinicContext.Clinics.Count() == 0)
            {
                _clinicContext.Clinics.AddRange(new[]
                {
                    new Clinic()
                    {
                        Name = "Clinic",
                        Address = "There",
                        lat = 43.54f,
                        lng = -70.33f,
                        WaitTime = 350000,
                        Description = "Long form description goes here."
                    },
                    new Clinic()
                    {
                        Name = "Clinic 2",
                        Address = "Here",
                        lat = 43.52f,
                        lng = -70.30f,
                        WaitTime = 350000,
                        Description = "Long form description goes here."
                    }
                });

                _clinicContext.SaveChanges();
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

        [Route("register")]
        [HttpPost]
        public IActionResult CreateClinic([FromBody] ClinicRegistration clinicRegistration)
        {
            return Ok(clinicRegistration);
        }
    }
}