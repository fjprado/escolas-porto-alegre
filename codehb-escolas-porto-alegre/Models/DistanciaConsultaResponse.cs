using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace codehb_escolas_porto_alegre.Models
{
    public class DistanciaConsultaResponse
    {
        public ResourceSetsDistancias[] ResourceSets { get; set; }
    }

    public class ResourceSetsDistancias
    {
        public ResourcesDistancias[] Resources { get; set; }
    }
    
    public class ResourcesDistancias
    {
        public ResultsDistancia[] Results { get; set; }
    }

    public class ResultsDistancia
    {
        public int DestinationIndex { get; set; }
        public int OriginIndex { get; set; }
        public decimal TravelDistance { get; set; }
        public decimal TravelDuration { get; set; }
    }
}
