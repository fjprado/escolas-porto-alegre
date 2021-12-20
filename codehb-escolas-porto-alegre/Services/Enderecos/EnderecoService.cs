using codehb_escolas_porto_alegre.Entities;
using codehb_escolas_porto_alegre.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace codehb_escolas_porto_alegre.Services.Enderecos
{
    public class EnderecoService : IEnderecoService
    {
        public async Task<List<Endereco>> GetListEnderecosSugeridos(EnderecoOrigemModel endereco)
        {
            try
            {
                var urlConsultaLocalizacao = "http://dev.virtualearth.net/REST/v1/Autosuggest";
                var client = new RestRequest(urlConsultaLocalizacao, Method.GET);
                var key = Environment.GetEnvironmentVariable("api_key_bing");

                client.RequestFormat = DataFormat.Json;
                client.AddHeader("Content-type", "application/json");
                client.AddParameter("query", endereco.Endereco, ParameterType.QueryString);
                client.AddParameter("userLocation", "-30.08,-51.21", ParameterType.QueryString);
                client.AddParameter("includeEntityTypes", "Address", ParameterType.QueryString);
                client.AddParameter("key", key, ParameterType.QueryString);

                RestClient _rest = new RestClient();
                var response = await _rest.ExecuteAsync<JObject>(client);

                var jsonSerializerSettings = new JsonSerializerSettings();
                jsonSerializerSettings.MissingMemberHandling = MissingMemberHandling.Ignore;

                var result = JsonConvert.DeserializeObject<EnderecoSugeridoConsultaResponse>(response.Content, jsonSerializerSettings);

                return result.ResourceSets.SelectMany(rs => rs.Resources.SelectMany(r => r.Value.Select(v => v.Address))).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }            
        }

        public async Task<Coordenada> GetCoordenadasEndereco(EnderecoOrigemModel endereco)
        {
            try
            {
                var urlConsultaLocalizacao = "http://dev.virtualearth.net/REST/v1/Locations";
                var client = new RestRequest(urlConsultaLocalizacao, Method.GET);               
                var key = Environment.GetEnvironmentVariable("api_key_bing");

                client.RequestFormat = DataFormat.Json;
                client.AddHeader("Content-type", "application/json");
                client.AddParameter("countryRegion", "BR", ParameterType.QueryString);
                client.AddParameter("addressLine", endereco.Endereco, ParameterType.QueryString);
                client.AddParameter("key", key, ParameterType.QueryString);

                RestClient _rest = new RestClient();
                var response = await _rest.ExecuteAsync<JObject>(client);

                var jsonSerializerSettings = new JsonSerializerSettings();
                jsonSerializerSettings.MissingMemberHandling = MissingMemberHandling.Ignore;

                var result = JsonConvert.DeserializeObject<LocalizacaoConsultaResponse>(response.Content, jsonSerializerSettings);

                return GetCoordenadas(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }            
        }

        private Coordenada GetCoordenadas(LocalizacaoConsultaResponse enderecoOrigemAPI)
        {
            var coordenadasList = enderecoOrigemAPI.ResourceSets.SelectMany(rs => rs.Resources.SelectMany(r => r.GeocodePoints)).FirstOrDefault().Coordinates;
            return new Coordenada() { Latitude = coordenadasList[0], Longitude = coordenadasList[1] };
        }
    }
}
