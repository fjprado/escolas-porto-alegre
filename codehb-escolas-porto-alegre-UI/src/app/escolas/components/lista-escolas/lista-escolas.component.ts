import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-escolas',
  templateUrl: './lista-escolas.component.html',
  styleUrls: ['./lista-escolas.component.css'],
})
export class ListaEscolasComponent implements OnInit {
  @Input('lista-escolas') listaEscolas: any[] | undefined;

  constructor() {}

  ngOnInit(): void {}
}
