import { Component, OnInit, ViewChild } from '@angular/core';
import { MedicosService } from '../../services/medicos.service';
import { ModalController, IonList } from '@ionic/angular';
import { Medico } from '../../interfaces/interfaces';
import Swal from 'sweetalert2';
import { async } from '@angular/core/testing';
import { DetalleMedicoComponent } from '../../componentes/medico/detalle-medico/detalle-medico.component';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.page.html',
  styleUrls: ['./medicos.page.scss'],
})
export class MedicosPage implements OnInit {

  desde: number = 0;
  totalRegistros : number = 0;
  cargando:boolean = true
  medicos:Medico[] = [];

  @ViewChild('lista' , {static:false}) lista: IonList;


  constructor(private _medicoService: MedicosService,
              private modalCtrl: ModalController) { }

  ngOnInit() {
    this.cargarMedicos();
  }

  cargarMedicos(){
    this.cargando = true;

    this._medicoService.cargarMedico( this.desde)
      .subscribe( (resp: any) => {

        //console.log(resp);
        //no traemos el total de usuarios
        this.totalRegistros = resp.total;
        //nos traemos los usuarios del servidor
        this.medicos = resp.medicos;
        this.cargando = false
      });
  }

  async verMedico(medico){
    console.log(medico);

    const modal = await this.modalCtrl.create({
      component:DetalleMedicoComponent,
      componentProps:{
        medico
      }
    });

    modal.present();
  }

  cambiarDesde(valor: number){
    let desde = this.desde + valor;
    //console.log( desde );

    if( desde >= this.totalRegistros){
      return;
    }

    if( desde < 0){
      return;

    }
    this.desde += valor;
    this.cargarMedicos();
  }

  crearMedico(){
    
  }

  actualizarMedico(medico){
    console.log(medico);
  }

  buscarMedico(termino:string){
  
    //console.log(termino);

    if( termino.length <= 0 ){
      this.cargarMedicos();
      return;
    }

    this.cargando = true;
    
    this._medicoService.buscarMedicos( termino)
      .subscribe( (medicos:Medico[]) => {
        //console.log(usuarios);
        this.medicos = medicos;
        this.cargando = false;
      });


  }

  eliminarMedico(medico){
    //console.log(medico);

    Swal.fire({
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar a ' + medico.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borralo',
      cancelButtonText: 'No, cancela',
      reverseButtons: true
    })
    .then( borrar => {
 
      if ( borrar.value ) {
        this._medicoService.borrarMedico( medico._id ).subscribe( borrado => {
          //console.log(borrado);
          this.cargarMedicos();
        });
        
        
      } else if ( borrar.dismiss === Swal.DismissReason.cancel ) {
        Swal.fire('Cancelado', 'Tranquilo no se ha borrado nada!!', 'error');
        this.lista.closeSlidingItems();
      }
 
    });
  }

}
