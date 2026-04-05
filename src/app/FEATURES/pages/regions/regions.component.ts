import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ChangeDetectorRef } from '@angular/core';
import { environment } from "../../../../environments/environment.prod";
import { Regions } from "../../../CORE/service/REGION/regions";
import { ResultModel } from 'src/app/MODELS/result-Models';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-regions',
  templateUrl: './regions.component.html',
  styleUrls: ['./regions.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule,FormsModule],
})
export class RegionsComponent implements OnInit, AfterViewInit {

  @ViewChild('mapContainer') mapContainer!: ElementRef;

  regionSeleccionadaIndex: number = 0;
  regiones: any = [];
  map!: L.Map;
  marker!: L.Marker;
  regionSeleccionada: any;

  regionLayer!: L.GeoJSON;
  bodegasMarkers: L.Marker[] = [];

  geojsonroute = environment.geojsonRoute

  constructor(private cdr: ChangeDetectorRef,
              private httpregions:Regions
  ) { }

  ngOnInit(): void {

    setTimeout(() => {
      this.getregions()
    }, 1000);

    // this.regiones = [
    //   {
    //     nombre: 'Valle del Limarí',
    //     descripcion: 'Región vitivinícola en Chile',

    //     geojson: `${this.geojsonroute}chile/limarí.geojson`,

        // bodegas: [
        //   { nombre: 'Bodega Villa Señor', lat: -30.55, lng: -71.05 },
        //   { nombre: 'Viña Concha y Toro', lat: -30.60, lng: -71.00 },
        //   { nombre: 'Bodega Tabalí', lat: -30.58, lng: -71.02 }
        // ]
    //   }
    // ];
  }

  getregions()
  {
    this.httpregions.getregions(null).subscribe
    (
      (res:ResultModel)=>
        {
          if(res.isSuccess)
            {
              res.data.forEach((element:any) => {
                  const nwNode = {
                            'pais':element.country,
                            'nombre':element.name,
                            'descripcion':element.description,
                            'geojson':`${this.geojsonroute}${element.country}/${element.geojson}`}
                  this.regiones.push(nwNode)          

                // bodegas: [
                //   { nombre: 'Bodega Villa Señor', lat: -30.55, lng: -71.05 },
                //   { nombre: 'Viña Concha y Toro', lat: -30.60, lng: -71.00 },
                //   { nombre: 'Bodega Tabalí', lat: -30.58, lng: -71.02 }
                // ]
              });
              
              const regionInicial = this.regiones[0];
              this.regionSeleccionada = regionInicial;
              this.actualizarMapa(regionInicial);
              

            }
        }
    )
  }

  ngAfterViewInit(): void {
    this.map = L.map(this.mapContainer.nativeElement, {
      center: [-30.6, -71.2],
      zoom: 8
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'OpenStreetMap'
    }).addTo(this.map);

    setTimeout(() => {
      this.map.invalidateSize();
    }, 1000);

    // const regionInicial = this.regiones[0];
    // this.regionSeleccionada = regionInicial;
    // this.actualizarMapa(regionInicial);
  }

  actualizarMapa(region: any): void {
    if (!this.map) return;

    // 🔥 LIMPIEZA
    if (this.marker) this.map.removeLayer(this.marker);
    if (this.regionLayer) {
                            this.regionLayer.clearLayers();
                            this.map.removeLayer(this.regionLayer);
                          }

    this.bodegasMarkers.forEach(m => this.map.removeLayer(m));
    this.bodegasMarkers = [];

    // 🔥 CENTRAR
    if(region)
      {
          fetch(region.geojson + '?t=' + new Date().getTime())
            .then(res => res.json())
            .then(data => {

              this.regionLayer = L.geoJSON(data, {
                style: {
                  color: '#ff8c00',
                  weight: 2,
                  fillColor: '#ffa500',
                  fillOpacity: 0.45
                }
              }).addTo(this.map);

              this.map.fitBounds(this.regionLayer.getBounds());

              // 🔥 ICONO
              // const grapeIcon = L.divIcon({
              //   html: `...`,
              //   className: '',
              //   iconSize: [40, 40],
              //   iconAnchor: [20, 40]
              // });

              // 🔥 BODEGAS (AHORA SÍ)
              // region.bodegas.forEach((bodega: any) => {

              //   const marker = L.marker([bodega.lat, bodega.lng], {
              //     icon: grapeIcon
              //   }).addTo(this.map);

              //   marker.bindTooltip(bodega.nombre, {
              //     permanent: true,
              //     direction: 'top',
              //     offset: [0, -30],
              //     className: 'custom-tooltip'
              //   });

              //   this.bodegasMarkers.push(marker);
              // });

            });
      }else
        {
          alert("Error")
        }
  }

  onRegionChange(event: any): void {
    const index = event.detail.value;
    const region = this.regiones[index];

    console.log("Índice seleccionado:", index);
    console.log("GeoJSON a cargar:", region.geojson);

    this.regionSeleccionada = region;
    this.actualizarMapa(region);
  }
}



