using codehb_escolas_porto_alegre.Entities;
using codehb_escolas_porto_alegre.Models;
using codehb_escolas_porto_alegre.Services.Escolas;
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
    public class EscolaController : ControllerBase
    {
        private readonly IEscolaService _escolaService;

        public EscolaController(IEscolaService escolaService)
        {
            this._escolaService = escolaService;
        }

        /// <summary>
        /// Procura por todas as escolas mais próximas às coordenadas informadas
        /// </summary>
        /// <param name="coordenadaOrigem">Informa qual a coordenada de origem</param>
        /// <response code="200">Retorna a lista de escolas ordenadas por distância</response>
        /// <response code="204">Se não houver lista de escolas</response>   
        /// <response code="400">Caso ocorra erro retorna a mensagem de exceção</response> 
        [HttpPost("GetListEscolas")]
        public async Task<ActionResult<IEnumerable<Escola>>> GetListEscolas([FromBody] Coordenada coordenadaOrigem)
        {
            try
            {
                var escolas = await _escolaService.GetListEscolas(coordenadaOrigem);

                if (escolas.Count == 0)
                    return NoContent();

                return Ok(escolas);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }                
        }
    }
}
