import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from 'src/app/interfaces/interfaces';
import { IonList } from '@ionic/angular';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  desde: number = 0;
  totalRegistros : number = 0;
  cargando:boolean = true
  usuarios:Usuario[] = [];

  @ViewChild('lista', {static:false}) lista: IonList;


  constructor(private _usuarioService: UsuariosService) {}

  ngOnInit(){
    //this.cargarUsuarios();
  }

  ionViewDidEnter() {
    this.cargarUsuarios();
  }

  cargarUsuarios(){

    this.cargando = true

    this._usuarioService.cargarUsuarios( this.desde)
      .subscribe( (resp: any) => {

        //console.log(resp);
        //no traemos el total de usuarios
        this.totalRegistros = resp.total;
        //nos traemos los usuarios del servidor
        this.usuarios = resp.usuarios;
        this.cargando = false
      });
  }

  buscarUsuario( termino:string ){
    //console.log(termino);

    if( termino.length <= 0 ){
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;
    
    this._usuarioService.buscarUsuarios( termino)
      .subscribe( (usuarios:Usuario[]) => {
        //console.log(usuarios);
        this.usuarios = usuarios;
        this.cargando = false;
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
    this.cargarUsuarios();
  }

  subirFoto(){

  }

  verUsuario(usuario){

  }

  actualizarUsuario(usuario:Usuario){
    this.lista.closeSlidingItems();
    console.log(usuario);
  }

  eliminarUsuario(usuario:Usuario){
    console.log(usuario);
    if(usuario._id === this._usuarioService.usuario._id){
      Swal.fire({ title: 'No puede borrar usuario', text: 'No se puede borrar a si mismo', icon: 'error' });
      return;
    }

    Swal.fire({
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar a ' + usuario.nombre,
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
        this._usuarioService.borrarUsuario( usuario._id ).subscribe( borrado => {
          //console.log(borrado);
          this.cargarUsuarios();
        });
 
      } else if ( borrar.dismiss === Swal.DismissReason.cancel ) {
        Swal.fire('Cancelado', 'Tranquilo no se ha borrado nada!!', 'error');
        this.lista.closeSlidingItems();
      }
 
    });
  }

  crearUsuario(){

  }

 



}
