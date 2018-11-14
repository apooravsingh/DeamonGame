using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RollGameApi.Models
{
    public class Player
    {
        public long id { get; set; }
        public int score { get; set; }
        public bool win { get; set; }
    }
}
