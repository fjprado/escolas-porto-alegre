using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace codehb_escolas_porto_alegre.Models
{
    public class DistanciaConsultaRequest
    {
        public List<Coordenada> Origins { get; set; }
        public List<Coordenada> Destinations { get; set; }
        public string TravelMode { get; set; } = "driving";
    }

    public class Coordenada
    {
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
    }
}
