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
  destination: google.maps.LatLngLiteral | undefined;

  options: google.maps.MapOptions = {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    scrollwheel: true,
    disableDefaultUI: true,
    disableDoubleClickZoom: true,
    zoom: 11,
  };

  ds: google.maps.DirectionsService | undefined;
  dr: google.maps.DirectionsRenderer | undefined;

  showMapPill: boolean = false;

  ngOnInit(): void {
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

      this.destination = {
        lat: position.coords.latitude - 0.001,
        lng: position.coords.longitude + 0.001,
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

      var destinationMarker = new google.maps.Marker({
        position: this.destination,
        map: this.map,
        icon: {
          url: './assets/icons/college-pin.svg',
          scaledSize: new google.maps.Size(40, 40),
        },
      });

      destinationMarker.addListener('click', (event: any) => {
        this.showMapPill = true;
      });

      this.map.addListener('click', (event: any) => {
        this.showMapPill = false;
      });

      this.setRoutePolyline();
    });
  }

  setRoutePolyline() {
    let request = {
      origin: this.source,
      destination: this.destination,
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
