using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace codehb_escolas_porto_alegre.Models
{
    public class LocalizacaoConsultaResponse
    {
        public ResourceSetsLocalizacoes[] ResourceSets { get; set; }
    }

    public class ResourceSetsLocalizacoes
    {
        public ResourcesLocalizacoes[] Resources { get; set; }
    }

    public class ResourcesLocalizacoes
    {
        public GeocodePoints[] GeocodePoints { get; set; }
    }

    public class GeocodePoints
    {
        public decimal[] Coordinates { get; set; }
    }
}
