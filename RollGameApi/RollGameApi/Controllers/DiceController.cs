using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RollGameApi.Models;

namespace RollGameApi.Controllers
{
    [Route("api/[Controller]")]
    public class DiceController : Controller
    {
        [Route("Roll")]
        public IActionResult Roll()
        {
            Random random = new Random();
            int result = (int)(random.NextDouble() * 6 + 1);
            return new OkObjectResult(result);
        }
    }
}