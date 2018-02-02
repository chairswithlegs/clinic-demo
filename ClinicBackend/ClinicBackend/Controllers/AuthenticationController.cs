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

namespace ClinicBackend.Controllers
{
    [Produces("application/json")]
    [Route("api/authentication")]
    public class AuthenticationController : Controller
    {
        IConfiguration _configuration;
        EncryptionKeyProvider _encryptionKeyProvider;

        public AuthenticationController(IConfiguration configuration, EncryptionKeyProvider encryptionKeyProvider)
        {
            _configuration = configuration;
            _encryptionKeyProvider = encryptionKeyProvider;
        }

        [HttpGet]
        public IActionResult RequestToken()
        {
            Claim[] claims = new[]
            {
                new Claim(ClaimTypes.Name, "testUsername")
            };

            SymmetricSecurityKey signingKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_encryptionKeyProvider.Key));
            SigningCredentials credentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);

            JwtSecurityToken token = new JwtSecurityToken
            (
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Issuer"],
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: credentials
            );

            var response = new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token)
            };

            return Ok(response);
        }
    }
}