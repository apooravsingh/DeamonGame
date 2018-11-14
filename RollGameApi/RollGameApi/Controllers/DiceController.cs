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

        [Route("DevilRoll")]
        public IActionResult DevilRoll()
        {
            List<int> list = new List<int>();
            Random random = new Random();
            int count = 3;
            for(int i=0; i < count; i++)
            {
                list.Add((int)(random.NextDouble() * 6 + 1));
            }
            return new OkObjectResult(list);
        }
    }
}