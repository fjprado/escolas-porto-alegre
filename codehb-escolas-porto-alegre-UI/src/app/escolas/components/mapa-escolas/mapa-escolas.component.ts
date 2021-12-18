import { Component, Input, OnInit } from '@angular/core';
import {} from 'googlemaps';

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

  dadosEscola: any;
  showDetails = false;

  ngOnInit(): void {
    this.carregarMapaInicial();
  }

  public carregarMapaInicial(listaEscolas: any = null) {
    this.ds = new google.maps.DirectionsService();
    this.dr = new google.maps.DirectionsRenderer({
      map: undefined,
      suppressMarkers: true,
    });

    navigator.geolocation.getCurrentPosition((position) => {
      this.source = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      this.map = new google.maps.Map(
        document.getElementById('map-canvas') as Element,
        {
          ...this.options,
          center: this.source,
        }
      );

      var markerStart = new google.maps.Marker({
        position: this.source,
        map: this.map,
        icon: {
          url: './assets/icons/user-pin.svg',
          scaledSize: new google.maps.Size(40, 40),
        },
      });

      if (listaEscolas) {
        listaEscolas.forEach((e: any) => {
          const destinationMarker = new google.maps.Marker({
            position: {
              lat: e.latitude,
              lng: e.longitude,
            },
            map: this.map,
            icon: {
              url: './assets/icons/college-pin.svg',
              scaledSize: new google.maps.Size(40, 40),
            },
          });

          this.attachData(destinationMarker, e, this.map);
        });
      }

      //this.setRoutePolyline();
    });
  }

  private attachData(marker: google.maps.Marker, data: any, map: any) {
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

    console.log(data);
    marker.addListener('click', () => {
      infowindow.open(marker.get('map'), marker);
    });

    map.addListener('click', (event: any) => {
      infowindow.close();
    });
  }

  // setRoutePolyline() {
  //   let request = {
  //     origin: this.source,
  //     destination: this.destination,
  //     travelMode: google.maps.TravelMode.DRIVING,
  //   };

  //   this.ds?.route(request, (res, status) => {
  //     this.dr?.setOptions({
  //       suppressPolylines: false,
  //       map: this.map,
  //     });

  //     if (status === google.maps.DirectionsStatus.OK) {
  //       this.dr?.setDirections(res);
  //     }
  //   });
  // }
}
