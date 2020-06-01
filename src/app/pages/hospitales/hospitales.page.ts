import { Component, OnInit, ViewChild } from '@angular/core';
import { Hospital } from '../../interfaces/interfaces';
import { IonList, ModalController } from '@ionic/angular';
import { HospitalesService } from '../../services/hospitales.service';
import Swal from 'sweetalert2';
import { DetalleHospitalComponent } from 'src/app/componentes/hospital/detalle-hospital/detalle-hospital.component';
import { HospitalCrearComponent } from '../../componentes/hospital/hospital-crear/hospital-crear.component';
import { HospitalActualizarComponent } from 'src/app/componentes/hospital/hospital-actualizar/hospital-actualizar.component';


@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.page.html',
  styleUrls: ['./hospitales.page.scss'],
})
export class HospitalesPage implements OnInit {

  desde: number = 0;
  totalRegistros : number = 0;
  cargando:boolean = true
  hospitales:Hospital[] = [];

  @ViewChild('lista', {static:false}) lista:IonList;

  constructor(private _hospitalService: HospitalesService,
              private modalCtrl: ModalController) { }

  ngOnInit() {
    this.cargarHospitales();
  }

  cargarHospitales(){
    this.cargando = true

    this._hospitalService.cargarHospital( this.desde)
      .subscribe( (resp: any) => {

        //console.log(resp);
        //no traemos el total de usuarios
        this.totalRegistros = resp.total;
        //nos traemos los usuarios del servidor
        this.hospitales = resp.hospitales;
        this.cargando = false
      });

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
    this.cargarHospitales();
  }

  async crearHospital(){
   
    const modal = await this.modalCtrl.create({
      component: HospitalCrearComponent

    });

    modal.onDidDismiss().then( () => {
      this.cargarHospitales();
    });

    modal.present();
  }

  buscarHospital(termino:string){
  
    //console.log(termino);

    if( termino.length <= 0 ){
      this.cargarHospitales();
      return;
    }

    this.cargando = true;
    
    this._hospitalService.buscarHospitales( termino)
      .subscribe( (hospitales:Hospital[]) => {
        //console.log(usuarios);
        this.hospitales = hospitales;
        this.cargando = false;
      });


  }

  async verHospital(hospital:Hospital){
  
    //console.log(hospital);

    const modal = await this.modalCtrl.create({
      component:DetalleHospitalComponent,
      componentProps:{
        hospital
      }
    });

    modal.present();
  }

  async actualizarHospital(hospital:Hospital){
    console.log(hospital);
    this.lista.closeSlidingItems();

    const modal = await this.modalCtrl.create({
      component: HospitalActualizarComponent,
      componentProps:{
        hospital
      }
    });

    modal.onDidDismiss().then( () => {
      this.cargarHospitales();
    });

    modal.present();
   
  }

  eliminarHospital(hospital:Hospital){
        //console.log(usuario);

        Swal.fire({
          title: '¿Esta seguro?',
          text: 'Esta a punto de borrar a ' + hospital.nombre,
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
            this._hospitalService.borrarHospital( hospital._id ).subscribe( borrado => {
              //console.log(borrado);
              this.cargarHospitales();
            });
            
            
          } else if ( borrar.dismiss === Swal.DismissReason.cancel ) {
            Swal.fire('Cancelado', 'Tranquilo no se ha borrado nada!!', 'error');
            this.lista.closeSlidingItems();
          }
     
        });
  }


}
