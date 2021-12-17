using codehb_escolas_porto_alegre.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace codehb_escolas_porto_alegre.Models
{
    public class EscolaConsultaResponse
    {
        public Result Result { get; set; }
    }

    public class Result
    {
        public List<Escola> Records { get; set; }
    }

}
