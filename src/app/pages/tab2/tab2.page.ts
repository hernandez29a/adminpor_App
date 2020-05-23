import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from 'src/app/interfaces/interfaces';

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

  actualizarUsuario(usuario){

  }

  eliminarUsuario(usuario){

  }

  crearUsuario(){

  }

 



}
