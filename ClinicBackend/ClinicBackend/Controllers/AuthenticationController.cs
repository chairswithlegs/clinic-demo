using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Hosting;
using ClinicBackend.Models;
using Microsoft.AspNetCore.Authorization;

namespace ClinicBackend.Controllers
{
    [Authorize]
    [Produces("application/json")]
    [Route("api/authentication")]
    public class AuthenticationController : Controller
    {
        IConfiguration _configuration;
        EncryptionKeyProvider _encryptionKeyProvider;
        AdminContext _adminContext;

        public AuthenticationController (IConfiguration configuration, EncryptionKeyProvider encryptionKeyProvider, AdminContext adminContext)
        {
            _configuration = configuration;
            _encryptionKeyProvider = encryptionKeyProvider;
            _adminContext = adminContext;
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("login")]
        public IActionResult Login([FromBody]LoginCredentials loginCredentials)
        {
            if (UserExists(loginCredentials))
            {

                Claim[] claims = new[]
                {
                    new Claim(ClaimTypes.Email, loginCredentials.Email)
                };

                SymmetricSecurityKey signingKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_encryptionKeyProvider.Key));
                SigningCredentials signingCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);

                JwtSecurityToken token = new JwtSecurityToken
                (
                    issuer: _configuration["Jwt:Issuer"],
                    audience: _configuration["Jwt:Issuer"],
                    claims: claims,
                    expires: DateTime.Now.AddHours(1),
                    signingCredentials: signingCredentials
                );

                var response = new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token)
                };

                return Ok(response);

            }
            else
            {
                return BadRequest();
            }
        }


        [HttpGet]
        [Route("check-token")]
        public IActionResult CheckToken()
        {
            return Ok();
        }

        private bool UserExists(LoginCredentials loginCredentials)
        {
            return _adminContext.Admins.FirstOrDefault((admin) => admin.Email == loginCredentials.Email && admin.Password == loginCredentials.Password) != null;
        }

        public class LoginCredentials
        {
            public string Email { get; set; }
            public string Password { get; set; }
        }
    }
}