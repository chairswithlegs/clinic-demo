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

        public ClinicController(ClinicContext clinicContext, IHostingEnvironment env)
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
            catch
            {
                return BadRequest();
            }
            
        }
    }
}