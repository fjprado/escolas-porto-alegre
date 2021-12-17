using codehb_escolas_porto_alegre.Entities;
using codehb_escolas_porto_alegre.Models;
using codehb_escolas_porto_alegre.Services.Enderecos;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace codehb_escolas_porto_alegre.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class EnderecoController : Controller
    {
        private readonly IEnderecoService _enderecoService;

        public EnderecoController(IEnderecoService enderecoService)
        {
            this._enderecoService = enderecoService;
        }

        /// <summary>
        /// Procura por endereços de acordo com parametro informado
        /// </summary>
        /// <param name="endereco">Informa qual o endereço de pesquisa</param>
        /// <response code="200">Retorna a lista de endereços</response>
        /// <response code="204">Se não houver enderecos</response>   
        [HttpPost]
        public async Task<ActionResult<IEnumerable<Endereco>>> GetListEnderecosSugeridos([FromBody] EnderecoOrigemModel endereco)
        {
            var enderecos = await _enderecoService.GetListEnderecosSugeridos(endereco);

            if (enderecos.Count == 0)
                return NoContent();

            return Ok(enderecos);
        }
    }    
}
