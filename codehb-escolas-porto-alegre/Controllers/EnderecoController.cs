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
        /// <param name="endereco">Informe qual o endereço de pesquisa por endereços sugeridos</param>
        /// <response code="200">Retorna a lista de endereços</response>
        /// <response code="204">Se não houver enderecos</response>   
        /// <response code="400">Caso ocorra erro retorna a mensagem de exceção</response>   
        [HttpPost("GetListEnderecosSugeridos")]
        public async Task<ActionResult<IEnumerable<Endereco>>> GetListEnderecosSugeridos([FromBody] EnderecoOrigemModel endereco)
        {
            try
            {
                var enderecos = await _enderecoService.GetListEnderecosSugeridos(endereco);

                if (enderecos.Count == 0)
                    return NoContent();

                return Ok(enderecos);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Procura por coordenadas de endereço de acordo com endereco informado
        /// </summary>
        /// <param name="endereco">Informe qual o endereço de pesquisa para obter as coordenadas</param>
        /// <response code="200">Retorna objeto contendo as coordenadas</response>
        /// <response code="204">Se não houver coordenada</response>   
        /// <response code="400">Caso ocorra erro retorna a mensagem de exceção</response> 
        [HttpPost("GetCoordenadasEndereco")]
        public async Task<ActionResult<Coordenada>> GetCoordenadasEndereco([FromBody] EnderecoOrigemModel endereco)
        {
            try
            {
                var coordenada = await _enderecoService.GetCoordenadasEndereco(endereco);

                if (coordenada != null)
                    return Ok(coordenada);

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }                        
        }
    }    
}
