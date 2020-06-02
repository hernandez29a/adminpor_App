import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Medico, Hospital } from '../../../interfaces/interfaces';
import { HospitalesService } from '../../../services/hospitales.service';
import { MedicosService } from '../../../services/medicos.service';

@Component({
  selector: 'app-medico-crear',
  templateUrl: './medico-crear.component.html',
  styleUrls: ['./medico-crear.component.scss'],
})
export class MedicoCrearComponent implements OnInit {

  constructor(private modalCtrl: ModalController,
              private _hopitalService: HospitalesService,
              private _medicoService: MedicosService) { }

  medico:Medico = {}
  desde: number = 0;
  hospitales:Hospital[] = [];

  ngOnInit() {
    this.cargarHospitales();
  }

  regresar(){
    this.modalCtrl.dismiss();
  }

  cargarHospitales(){
    this._hopitalService.cargarHospital( this.desde)
    .subscribe( (resp: any) => {

      //nos traemos los usuarios del servidor
      this.hospitales = resp.hospitales;
      console.log(this.hospitales);
    });
}  

  crearMedico( medico:Medico ){
    console.log(medico)

    this.medico.nombre = medico.nombre
    this.medico.hospital = medico.hospital

    this._medicoService.crearMedico(this.medico)
      .subscribe();
      this.modalCtrl.dismiss();

  }


}
