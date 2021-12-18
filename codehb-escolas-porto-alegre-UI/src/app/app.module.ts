import { EscolasService } from './escolas/escolas.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import localept from '@angular/common/locales/pt';
import {
  CommonModule,
  HashLocationStrategy,
  LocationStrategy,
  registerLocaleData,
} from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EscolasComponent } from './escolas/escolas.component';
import { ListaEscolasComponent } from './escolas/components/lista-escolas/lista-escolas.component';
import { MapaEscolasComponent } from './escolas/components/mapa-escolas/mapa-escolas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
registerLocaleData(localept, 'pt');

const useBing = true;

@NgModule({
  declarations: [
    AppComponent,
    EscolasComponent,
    ListaEscolasComponent,
    MapaEscolasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    EscolasService,
    { provide: LOCALE_ID, useValue: 'pt' },
    MapaEscolasComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
