using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ClinicBackend.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Authorization;

namespace ClinicBackend.Controllers
{
    [Authorize]
    [Produces("application/json")]
    [Route("api/clinics")]
    public class ClinicController : Controller
    {
        ClinicContext _clinicContext;

        public ClinicController(ClinicContext clinicContext)
        {
            _clinicContext = clinicContext;
        }
       
        [AllowAnonymous]
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_clinicContext.Clinics.ToList());
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            Clinic clinic = _clinicContext.Clinics.FirstOrDefault((_clinic) => _clinic.Id == id);

            if (clinic == null)
            {
                return NotFound($"Clinic with an id of {id.ToString()} could not be found.");
            }

            return Ok(clinic);
        }

        [Route("delete")]
        [HttpDelete("{id}")]
        public IActionResult DeleteClinic(int id)
        {
            Clinic clinic = _clinicContext.Clinics.FirstOrDefault((_clinic) => _clinic.Id == id);
            
            if (clinic != null)
            {
                _clinicContext.Clinics.Remove(clinic);
                _clinicContext.SaveChanges();

                return Ok("Clinic successfully deleted.");
            }
            else
            {
                return NotFound($"Clinic with an id of {id.ToString()} could not be found.");
            }
        }

        [Route("create")]
        [HttpPost]
        public IActionResult CreateClinic([FromBody] Clinic clinic)
        {
            try
            {
                _clinicContext.Add(clinic);
                _clinicContext.SaveChanges();
                return Ok("Clinic successfully created.");
            }
            catch
            {
                return BadRequest("Clinic could not be created.");
            }
            
        }
    }
}