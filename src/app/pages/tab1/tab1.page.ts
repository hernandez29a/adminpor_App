import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from 'src/app/interfaces/interfaces';
import { async } from '@angular/core/testing';

declare var window:any;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  componentes: Componente[] = [
    {
    icon:'wallet',
    name: 'Perfil',
    redirecto:'/main/tabs/tab3'
    },
    {
    icon:'wallet',
    name: 'Hospitales',
    redirecto:'/main/tabs/hospitales'
    },
    {
      icon:'wallet',
      name: 'Medicos',
      redirecto:'/main/tabs/medicos'
      }
  ];

  usuario: Usuario = {};
  role: string ;

  constructor( private _usuarioService: UsuariosService) {}

  ngOnInit(){
    this.carrgarRol();
  }

  carrgarRol(){
    this._usuarioService.obtenerRol()
    .subscribe( (resp:any) => {
      //console.log( 'el role es ', resp.usuario.role);
      this.role = resp.usuario.role;

    }) 
  }
}

interface Componente {
  icon:string;
  name:string
  redirecto:string;
}
