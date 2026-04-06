import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ChangeDetectorRef } from '@angular/core';
import { environment } from "../../../../environments/environment.prod";
import { Regions } from "../../../CORE/service/REGION/regions";
import { ResultModel } from 'src/app/MODELS/result-Models';
import { FormsModule } from '@angular/forms';
// import {
//   IonContent,
//   IonCard,
//   IonCardContent,
//   IonCardHeader,
//   IonCardTitle,
//   IonItem,
//   IonLabel,
//   IonInput,
//   IonTextarea,
//   IonButton,
//   IonIcon,
//   IonSelect
// } from '@ionic/angular/standalone';




@Component({
  selector: 'app-regions',
  templateUrl: './regions.component.html',
  styleUrls: ['./regions.component.scss'],
  standalone: true,
  imports: [CommonModule, 
            IonicModule,
            FormsModule
          ],
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

  searchText: string = '';
  regionesFiltradas: any[] = [];  

  geojsonroute = environment.geojsonRoute

  constructor(private cdr: ChangeDetectorRef,
              private httpregions:Regions
  ) { }

  ngOnInit(): void {

    setTimeout(() => {
      this.getregions()
    }, 1000);
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
                  const BODS:any=[]
                   element.wineries.forEach((elementBod:any) => {
                    const nwbod = { 'nombre':elementBod.winery_name,
                                    'lat':elementBod.latitude,
                                    'lng':elementBod.longitude}
                    BODS.push(nwbod)                
                  });
                  const nwNode = {
                            'pais':element.country,
                            'nombre':element.name,
                            'descripcion':element.description,
                            'geojson':`${this.geojsonroute}${element.country}/${element.geojson}`,
                            'bodegas':BODS}
                  this.regiones.push(nwNode)          


              });
              
              const regionInicial = this.regiones[0];
              this.regionSeleccionada = regionInicial;
              this.actualizarMapa(regionInicial);
              

            }
        }
    )
  }

  ngAfterViewInit(): void {

    delete (L.Icon.Default.prototype as any)._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'assets/marker-icon-2x.png',
      iconUrl: 'assets/marker-icon.png',
      shadowUrl: 'assets/marker-shadow.png',
    });

    //creacion del mapa
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
              const grapeIcon = L.divIcon({
                html: `<div style="font-size:30px;">🍇</div>`,
                className: '',
                iconSize: [40, 40],
                iconAnchor: [20, 40]
              });

              // 🔥 BODEGAS (AHORA SÍ)
              region.bodegas.forEach((bodega: any) => {

                const marker = L.marker([bodega.lat, bodega.lng], {
                  icon: grapeIcon
                }).addTo(this.map);

                marker.bindTooltip(bodega.nombre, {
                  permanent: true,
                  direction: 'top',
                  offset: [0, -30],
                  className: 'custom-tooltip'
                });

                this.bodegasMarkers.push(marker);
              });

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



  filtrarRegiones() {
    const texto = this.searchText.toLowerCase();

    this.regionesFiltradas = this.regiones.filter((r: any) =>
      `${r.pais} ${r.nombre}`.toLowerCase().includes(texto)
    );
  }

  seleccionarRegion(region: any) {
    this.regionSeleccionada = region;
    this.actualizarMapa(region);

    // limpiar búsqueda
    this.searchText = `${region.pais} - ${region.nombre}`;
    this.regionesFiltradas = [];
  }  


}



