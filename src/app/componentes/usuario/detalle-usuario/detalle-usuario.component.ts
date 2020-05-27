import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-detalle-usuario',
  templateUrl: './detalle-usuario.component.html',
  styleUrls: ['./detalle-usuario.component.scss'],
})
export class DetalleUsuarioComponent implements OnInit {

  constructor( private modalCtrl: ModalController) { }
  @Input() usuario:Usuario;

  ngOnInit() {
    const usuario = this.usuario;
    return usuario;
  }

  regresar(){
    this.modalCtrl.dismiss();
  }

}
