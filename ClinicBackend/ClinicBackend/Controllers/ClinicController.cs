using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ClinicBackend.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Authorization;
using System.Net.Http;
using Microsoft.Extensions.Configuration;
using System.Net.Http.Headers;
using Newtonsoft.Json;

namespace ClinicBackend.Controllers
{
    [Authorize]
    [Produces("application/json")]
    [Route("api/clinics")]
    public class ClinicController : Controller
    {
        IConfiguration _configuration;
        ClinicContext _clinicContext;

        public ClinicController(ClinicContext clinicContext, IConfiguration configuration)
        {
            _configuration = configuration;
            _clinicContext = clinicContext;
        }
       
        [AllowAnonymous]
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_clinicContext.Clinics.ToList());
            }
            catch
            {
                return StatusCode(500, "Clinic data could not be loaded");
            }
            
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            try
            {
                Clinic clinic = _clinicContext.Clinics.FirstOrDefault((_clinic) => _clinic.Id == id);

                if (clinic == null)
                {
                    return NotFound($"Clinic with an id of {id.ToString()} could not be found.");
                }

                return Ok(clinic);
            }
            catch
            {
                return StatusCode(500, "Clinic data could not be loaded");
            }
            
        }

        [HttpGet("address/{address}")]
        public async Task<IActionResult> ValidateAddress(string address)
        {
            try
            {
                using (HttpClient client = new HttpClient())
                {
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    HttpResponseMessage response = await client.GetAsync($"https://maps.googleapis.com/maps/api/geocode/json?address={address}&key={_configuration["GoogleApi"]}");

                    var responseContent = await response.Content.ReadAsStringAsync();
                    var deserializedContent = JsonConvert.DeserializeObject(responseContent);
                    return Json(deserializedContent);
                }
            }
            catch
            {
                return StatusCode(500, "Server could not validate address.");
            }
        }

        [Route("delete")]
        [HttpDelete("{id}")]
        public IActionResult DeleteClinic(int id)
        {
            try
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
                    return NotFound($"Clinic with id of ${clinic.Id} does not exist.");
                }
            }
            catch
            {
                return StatusCode(500, "Clinic could not be deleted.");
            }
        }

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
                return StatusCode(500, "Clinic could not be created.");
            }
            
        }

        [HttpPut]
        public IActionResult UpdateClinic([FromBody] Clinic clinic)
        {
            try
            {
                Clinic oldClinic = _clinicContext.Clinics.FirstOrDefault((_clinic) => _clinic.Id == clinic.Id);

                if (oldClinic != null)
                {
                    _clinicContext.Entry(oldClinic).CurrentValues.SetValues(clinic);
                    _clinicContext.SaveChanges();
                    return Ok("Clinic successfully updated.");
                }
                else
                {
                    return NotFound($"Clinic with id of ${clinic.Id} does not exist.");
                }
            }
            catch
            {
                return StatusCode(500, "Clinic could not be updated.");
            }
        }
    }
}