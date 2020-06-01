import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/interfaces/interfaces';
import { HospitalesService } from '../../../services/hospitales.service';
import { ModalController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { NgForm } from '@angular/forms';

declare var window:any;

@Component({
  selector: 'app-hospital-crear',
  templateUrl: './hospital-crear.component.html',
  styleUrls: ['./hospital-crear.component.scss'],
})
export class HospitalCrearComponent implements OnInit {
  imagenTemp:string;

  hospital:Hospital = {
    nombre: ''
  };

  constructor(private _hospitalService: HospitalesService,
              private modalCtrl: ModalController,
              private camera: Camera) { }

  ngOnInit() {}

  crearHospital(hospital:Hospital){
    console.log(this.hospital)

    this.hospital.nombre = hospital.nombre

    this._hospitalService.crearHospital(this.hospital).subscribe();
    this.modalCtrl.dismiss();
  
  }

  regresar() {
    this.modalCtrl.dismiss();
  }

}
