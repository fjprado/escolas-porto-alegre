import { MapaEscolasComponent } from './../mapa-escolas/mapa-escolas.component';
import { Component, Input, OnInit } from '@angular/core';
import { Escola } from '../../model/escola.model';

@Component({
  selector: 'app-lista-escolas',
  templateUrl: './lista-escolas.component.html',
  styleUrls: ['./lista-escolas.component.css'],
})
export class ListaEscolasComponent implements OnInit {
  @Input('lista-escolas') listaEscolas: Escola[] | undefined;
  indexRotaAtiva: number | undefined;

  constructor(private mapaEscolasComponent: MapaEscolasComponent) {}

  ngOnInit(): void {}

  verRota(item: Escola, index: number) {
    this.mapaEscolasComponent.setRoutePolyline(item);
    this.indexRotaAtiva = index;
  }
}
