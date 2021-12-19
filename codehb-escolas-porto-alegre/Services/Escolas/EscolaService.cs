using codehb_escolas_porto_alegre.Entities;
using codehb_escolas_porto_alegre.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace codehb_escolas_porto_alegre.Services.Escolas
{
    public class EscolaService : IEscolaService
    {
        public async Task<List<Escola>> GetListEscolas(Coordenada coordenadaOrigem)
        {
            try
            {
                var urlConsultaEscolas = "https://dadosabertos.poa.br/api/3/action/datastore_search";
                var client = new RestRequest(urlConsultaEscolas, Method.GET);
                var resourceId = "5579bc8e-1e47-47ef-a06e-9f08da28dec8";

                client.RequestFormat = DataFormat.Json;
                client.AddHeader("Content-type", "application/json");
                client.AddParameter("resource_id", resourceId, ParameterType.QueryString);

                RestClient _rest = new RestClient();
                var response = await _rest.ExecuteAsync<JObject>(client);

                var jsonSerializerSettings = new JsonSerializerSettings();
                jsonSerializerSettings.MissingMemberHandling = MissingMemberHandling.Ignore;

                var escolasConsultaResponse = JsonConvert.DeserializeObject<EscolaConsultaResponse>(response.Content, jsonSerializerSettings);

                return await OrdernarListaEscolas(escolasConsultaResponse.Result.Records, coordenadaOrigem);
            }
            catch (Exception ex)
            {
                throw ex;
            }            
        }   

        private async Task<List<Escola>> OrdernarListaEscolas(List<Escola> escolas, Coordenada coordenadasOrigem)
        {
            var urlConsultaLocalizacao = "https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix";
            var client = new RestRequest(urlConsultaLocalizacao, Method.POST);
            var key = "AmldTSU6HNRemL234Vk0ZkHEVcK1aU-kCHVmNA_fj09_Crqkg9wZWJdCc-PYSIK6";
            var coordenadasDestino = escolas.Select(s => new Coordenada(){ Latitude = s.Latitude, Longitude = s.Longitude }).ToList();
            var serializedRequest = JsonConvert.SerializeObject(new DistanciaConsultaRequest()
            {
                Origins = new List<Coordenada>() { coordenadasOrigem },
                Destinations = coordenadasDestino
            });

            client.RequestFormat = DataFormat.Json;
            client.AddHeader("Content-type", "application/json");
            client.AddParameter("application/json", serializedRequest, ParameterType.RequestBody);
            client.AddParameter("key", key, ParameterType.QueryString);

            RestClient _rest = new RestClient();
            var response = await _rest.ExecuteAsync<JObject>(client);

            var jsonSerializerSettings = new JsonSerializerSettings();
            jsonSerializerSettings.MissingMemberHandling = MissingMemberHandling.Ignore;

            var result = JsonConvert.DeserializeObject<DistanciaConsultaResponse>(response.Content, jsonSerializerSettings);

            foreach(var escola in escolas)
            {
                escola.DistanciaOrigem = result.ResourceSets.SelectMany(rs => rs.Resources.SelectMany(r => r.Results.Where(w => w.DestinationIndex == escolas.IndexOf(escola)))).FirstOrDefault().TravelDistance;
            }

            return escolas.OrderBy(o => o.DistanciaOrigem).ToList();
        }
    }
}
