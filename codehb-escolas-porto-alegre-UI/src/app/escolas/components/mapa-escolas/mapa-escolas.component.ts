import { Coordenada } from './../../model/coordenada.model';
import { Component, Input, OnInit } from '@angular/core';
import {} from 'googlemaps';
import { Escola } from '../../model/escola.model';

@Component({
  selector: 'app-mapa-escolas',
  templateUrl: './mapa-escolas.component.html',
  styleUrls: ['./mapa-escolas.component.css'],
})
export class MapaEscolasComponent implements OnInit {
  map: google.maps.Map | undefined;
  source: google.maps.LatLngLiteral | undefined;

  options: google.maps.MapOptions = {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    scrollwheel: true,
    disableDefaultUI: true,
    disableDoubleClickZoom: true,
    zoom: 11,
  };

  ds: google.maps.DirectionsService | undefined;
  dr: google.maps.DirectionsRenderer | undefined;

  ngOnInit(): void {
    this.carregarMapaInicial();
  }

  public carregarMapaInicial(
    enderecoCoordenada: any = null,
    listaEscolas: any = null,
    mostrarRota = false
  ) {
    this.ds = new google.maps.DirectionsService();
    this.dr = new google.maps.DirectionsRenderer({
      map: undefined,
      suppressMarkers: true,
    });

    navigator.geolocation.getCurrentPosition((position) => {
      if (enderecoCoordenada == null) {
        this.source = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      } else if (enderecoCoordenada != null && !mostrarRota) {
        this.source = {
          lat: enderecoCoordenada.latitude,
          lng: enderecoCoordenada.longitude,
        };
      } else {
        this.source = {
          lat: enderecoCoordenada.lat,
          lng: enderecoCoordenada.lng,
        };
      }

      this.map = new google.maps.Map(
        document.getElementById('map-canvas') as Element,
        {
          ...this.options,
          center: this.source,
        }
      );

      const markerStart = new google.maps.Marker({
        position: this.source,
        map: this.map,
        icon: {
          url: './assets/icons/user-pin.svg',
          scaledSize: new google.maps.Size(35, 35),
        },
      });

      if (listaEscolas) {
        this.destinationsMarkers(this.map, listaEscolas);
      }
    });
  }

  private destinationsMarkers(map: google.maps.Map, listaEscolas: Escola[]) {
    listaEscolas.forEach((e: Escola) => {
      const destinationMarker = new google.maps.Marker({
        position: {
          lat: e.latitude!,
          lng: e.longitude!,
        },
        map: this.map,
        icon: {
          url: './assets/icons/college-pin.svg',
          scaledSize: new google.maps.Size(30, 30),
        },
      });

      this.attachData(destinationMarker, e, this.map!);
    });
  }

  private attachData(
    marker: google.maps.Marker,
    data: Escola,
    map: google.maps.Map
  ) {
    const infowindow = new google.maps.InfoWindow({
      content: `<h2>${data.nome}</h2>
      <div id="bodyContent">
      <p><b>Telefone:</b> ${data.telefone}</p>
      <p><b>E-mail:</b> ${data.email}</p>
      <p><b>Site:</b> ${data.url_Website}</p>
      <p><b>Endereço:</b> ${data.logradouro}, ${data.numero}</p>
      <p><b>Bairro:</b> ${data.bairro}</p>
      </div>`,
    });

    marker.addListener('click', () => {
      infowindow.open(marker.get('map'), marker);
    });

    map.addListener('click', (event: any) => {
      infowindow.close();
    });
  }

  setRoutePolyline(item: Escola) {
    const destination = {
      lat: item.latitude!,
      lng: item.longitude!,
    };

    const request = {
      origin: this.source,
      destination,
      travelMode: google.maps.TravelMode.DRIVING,
    };

    this.ds?.route(request, (res, status) => {
      this.dr?.setOptions({
        suppressPolylines: false,
        map: this.map,
      });

      if (status === google.maps.DirectionsStatus.OK) {
        this.dr?.setDirections(res);
      }
    });
  }
}
