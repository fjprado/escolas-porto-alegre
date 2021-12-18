import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class EscolasService {
  urlAPI = 'https://web-codehb-escolas-porto-alegre.azurewebsites.net/api/v1';

  constructor(private httpClient: HttpClient) {}

  async obterSugestoesEndereco(value: string): Promise<any> {
    return this.httpClient
      .post(`${this.urlAPI}/Endereco/GetListEnderecosSugeridos`, {
        endereco: value,
      })
      .toPromise();
  }

  async obterEscolas(endereco: string): Promise<any> {
    return this.httpClient
      .post(`${this.urlAPI}/Escola/GetListEscolas`, { endereco })
      .toPromise();
  }
}
