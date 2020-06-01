import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Medico } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-detalle-medico',
  templateUrl: './detalle-medico.component.html',
  styleUrls: ['./detalle-medico.component.scss'],
})
export class DetalleMedicoComponent implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  @Input() medico:Medico;

  ngOnInit() {
    const medico = this.medico;
    return medico;
  }

  regresar(){
    this.modalCtrl.dismiss();
  }

}
