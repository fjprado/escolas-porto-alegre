import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EscolasComponent } from './escolas/escolas.component';
import { ListaEscolasComponent } from './escolas/components/lista-escolas/lista-escolas.component';
import { MapaEscolasComponent } from './escolas/components/mapa-escolas/mapa-escolas.component';

const useBing = true;

@NgModule({
  declarations: [
    AppComponent,
    EscolasComponent,
    ListaEscolasComponent,
    MapaEscolasComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
