import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Coordenada } from './model/coordenada.model';
import { Escola } from './model/escola.model';

@Injectable({ providedIn: 'root' })
export class EscolasService {
  urlAPI = 'https://web-codehb-escolas-porto-alegre.azurewebsites.net/api/v1';

  constructor(private httpClient: HttpClient) {}

  async obterSugestoesEndereco(value: string): Promise<Array<string>> {
    return this.httpClient
      .post<Array<string>>(
        `${this.urlAPI}/Endereco/GetListEnderecosSugeridos`,
        {
          endereco: value,
        }
      )
      .toPromise();
  }

  async obterEnderecoCoordendaAtual(endereco: string): Promise<Coordenada> {
    return this.httpClient
      .post<Coordenada>(`${this.urlAPI}/Endereco/GetCoordenadasEndereco`, {
        endereco,
      })
      .toPromise();
  }

  async obterEscolas(enderecoCoordenada: Coordenada): Promise<Array<Escola>> {
    return this.httpClient
      .post<Array<Escola>>(
        `${this.urlAPI}/Escola/GetListEscolas`,
        enderecoCoordenada
      )
      .toPromise();
  }
}
