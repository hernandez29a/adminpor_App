import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Hospital } from '../../../interfaces/interfaces';

@Component({
  selector: 'app-detalle-hospital',
  templateUrl: './detalle-hospital.component.html',
  styleUrls: ['./detalle-hospital.component.scss'],
})
export class DetalleHospitalComponent implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  @Input() hospital:Hospital;

  ngOnInit() {
    const hospital = this.hospital;
    return hospital;
  }

  regresar(){
    this.modalCtrl.dismiss();
  }

}
