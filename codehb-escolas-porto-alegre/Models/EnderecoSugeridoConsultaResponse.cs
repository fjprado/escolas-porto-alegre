using codehb_escolas_porto_alegre.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace codehb_escolas_porto_alegre.Models
{
    public class EnderecoSugeridoConsultaResponse
    {
        public ResourceSetsEnderecos[] ResourceSets { get; set; }
    }

    public class ResourceSetsEnderecos
    {
        public ResourcesEnderecos[] Resources { get; set; }
    }

    public class ResourcesEnderecos
    {
        public Enderecos[] Value { get; set; }
    }

    public class Enderecos
    {
        public Endereco Address { get; set; }
    }
}
