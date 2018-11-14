using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RollGameApi.Models;

namespace RollGameApi.Controllers
{
    [Route("api/[Controller]")]
    public class PlayersController : Controller
    {
        [Route("Intialize/{num}")]
        public IActionResult Intialize(string num)
        {
            int result = int.Parse(num) / 2 + 1;
            return new OkObjectResult(result);
        }
    }
}