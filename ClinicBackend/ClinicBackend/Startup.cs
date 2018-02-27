using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Identity;
using ClinicBackend.Models;
using System.Security.Cryptography;

namespace ClinicBackend
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //Add the enncryption key provider to DI container
            EncryptionKeyProvider encryptionKeyProvider = new EncryptionKeyProvider();
            services.AddSingleton(encryptionKeyProvider);

            services.AddDbContext<ClinicContext>((options) => options.UseInMemoryDatabase("clinics"));
            services.AddDbContext<AdminContext>((options) => options.UseInMemoryDatabase("admin"));

            services.AddIdentity<Admin, IdentityRole>()
                .AddEntityFrameworkStores<AdminContext>()
                .AddDefaultTokenProviders();

            services.AddAuthentication((options) =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer((options) =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = Configuration["Jwt:Issuer"],
                    ValidAudience = Configuration["Jwt:Issuer"],
                    IssuerSigningKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(encryptionKeyProvider.Key))
                };
            });

            services.AddCors((options) =>
            {
                options.AddPolicy("development", (policyBuilder) =>
                {
                    policyBuilder.AllowAnyOrigin();
                    policyBuilder.AllowAnyHeader();
                    policyBuilder.AllowAnyMethod();
                });
            });

            services.AddMvc();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseCors("development");
            }

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            //Redirect non-api requests to Angular
            app.Use(async (context, next) => {
                await next();

                if (context.Response.StatusCode == 404 && !context.Request.Path.Value.Contains("/api"))
                {
                    context.Request.Path = "/index.html"; 
                    await next();
                }
            });

            //Serve the Angular app from the wwwroot directory
            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseAuthentication();

            app.UseMvc();
        }
    }
}
