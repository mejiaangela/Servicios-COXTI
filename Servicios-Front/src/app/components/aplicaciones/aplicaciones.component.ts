import { Component, OnInit } from '@angular/core';
import { CargarScriptsService } from 'src/app/cargar-scripts.service';

@Component({
  selector: 'app-aplicaciones',
  templateUrl: './aplicaciones.component.html',
  styleUrls: ['./aplicaciones.component.css']
})
export class AplicacionesComponent implements OnInit {

  constructor(private _CargaScripts:CargarScriptsService) { 
    _CargaScripts.Carga(["js/contador"]);
  }

  ngOnInit(): void {
  }

}
