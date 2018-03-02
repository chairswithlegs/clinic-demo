using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.DependencyInjection;
using ClinicBackend.Models;

namespace ClinicBackend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = BuildWebHost(args);


            using (var scope = host.Services.CreateScope())
            {

                IServiceProvider services = scope.ServiceProvider;
                IHostingEnvironment env = services.GetRequiredService<IHostingEnvironment>();

                if (env.IsDevelopment())
                {
                    SeedDevelopmentData(services);
                }
                else if (env.IsProduction())
                {
                    SeedProductionData(services);
                }

            }

            host.Run();
        }

        public static IWebHost BuildWebHost(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                .Build();

        static void SeedDevelopmentData(IServiceProvider services)
        {
            ClinicContext clinicContext = services.GetRequiredService<ClinicContext>();
            AdminContext adminContext = services.GetRequiredService<AdminContext>();

            clinicContext.Clinics.AddRange(new[]
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
                    Lat = 43.54f,
                    Lng = -70.33f,
                    WaitTime = 350000,
                    Description = "Long form description goes here."
                }
            });


            adminContext.Admins.Add(new Admin()
            {
                Email = "test@test.com",
                Password = "test"
            });

            clinicContext.SaveChanges();
            adminContext.SaveChanges();
        }

        static void SeedProductionData(IServiceProvider services)
        {

            IConfiguration configuration = services.GetRequiredService<IConfiguration>();
            AdminContext adminContext = services.GetRequiredService<AdminContext>();

            if (adminContext.Admins.Count() == 0)
            {
                adminContext.Admins.Add(new Admin
                {
                    Email = configuration["SeedData:AdminCredentials:Email"],
                    Password = configuration["SeedData:AdminCredentials:Password"]
                });

                adminContext.SaveChanges();
            }
        }
    }
}
