import { MapaEscolasComponent } from './components/mapa-escolas/mapa-escolas.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';
import { EscolasService } from './escolas.service';
import { Coordenada } from './model/coordenada.model';
import { Escola } from './model/escola.model';

@Component({
  selector: 'app-escolas',
  templateUrl: './escolas.component.html',
  styleUrls: ['./escolas.component.css'],
})
export class EscolasComponent implements OnInit {
  public form!: FormGroup;
  endereco: string = '';
  enderecoCoordenada: Coordenada = new Coordenada();
  listaOptions: string[] = [];
  listaEscolas: Escola[] = [];

  constructor(
    private fb: FormBuilder,
    private escolasService: EscolasService,
    private mapaEscolasComponent: MapaEscolasComponent
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      address: [this.endereco, [Validators.required]],
    });

    this.form.controls.address.valueChanges
      .pipe(
        map((value) => value.trim()),
        filter((value) => value.length > 5),
        debounceTime(150),
        distinctUntilChanged()
      )
      .subscribe(async (value) => {
        this.endereco = value;
        const result = await this.escolasService.obterSugestoesEndereco(
          this.endereco
        );
        this.listaOptions = result
          ? result.map((m: any) => m.formattedAddress)
          : [];
      });
  }

  async pesquisarEscolas() {
    this.enderecoCoordenada =
      await this.escolasService.obterEnderecoCoordendaAtual(this.endereco);
    this.listaEscolas = await this.escolasService.obterEscolas(
      this.enderecoCoordenada
    );
    this.mapaEscolasComponent.carregarMapaInicial(
      this.enderecoCoordenada,
      this.listaEscolas
    );
  }
}
