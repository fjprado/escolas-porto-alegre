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
            var urlConsultaLocalizacao = "http://dev.virtualearth.net/REST/v1/Autosuggest";
            var client = new RestRequest(urlConsultaLocalizacao, Method.GET);
            var key = "AmldTSU6HNRemL234Vk0ZkHEVcK1aU-kCHVmNA_fj09_Crqkg9wZWJdCc-PYSIK6";

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
    }
}
