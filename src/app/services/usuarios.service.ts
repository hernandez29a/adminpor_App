import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RespuestaUsuarios, Usuario } from '../interfaces/interfaces';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2'
import { catchError } from "rxjs/operators";
import {Observable, throwError} from 'rxjs'
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';


const URL_SERVICIOS = environment.URL

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private usuario:Usuario = {};
  token:string = null;
  meny:any = [];

  constructor( private http: HttpClient,
               private storage: Storage,
               private navCtrl: NavController) { }

               
  login(email: string, password: string){
    const data = {email,password};
    
    let url = URL_SERVICIOS + '/login';

    return this.http.post(url, data)
    .pipe(
      map((resp: any) => {
        
       // this.guardarStorage( resp.id, resp.token, resp.usuario , resp.menu );
      console.log(resp);
        
      if( resp['ok']){
        this.guardatToken( resp['token'])
      }
       // return true;
      }), 
      catchError(err => {
        //console.log('Error que viene del servidor', err.error.mensaje);
        this.token = null;
        this.storage.clear();
        Swal.fire({ title: 'Error en el login', text: err.error.mensaje, icon: 'error' });
        return throwError(err.message);
      
      })

      )

  }

  logout(){
    this.token   = null;
    this.usuario = null;
    this.storage.clear();
    this.navCtrl.navigateRoot('/login', {animated: true});
  }

   //obtener los datos del usuario logeado
   getUsuario(){

    if(!this.usuario._id){
      this.validaToken();
    }

    return{...this.usuario};
  }

  async guardatToken( token:string){
    this.token = token;
    await this.storage.set('token', token);

    await this.validaToken();
  }

  async cargarToken(){
    this.token = await this.storage.get('token') || null;
  }

  async validaToken():Promise<boolean>{

    
    await this.cargarToken();
    
    if (!this.token) {
      //si el token no es valido se regresa al usuario al inicio
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    }
    
    return new Promise<boolean>(resolve => {
      let url = URL_SERVICIOS + '/usuario/usuario';
      url += '?token=' + this.token;
      
      this.http.get(url )
        .subscribe( resp => {

          if ( resp['ok'] ) {
           this.usuario = resp['usuario'];
            resolve(true);
          } else {
            this.navCtrl.navigateRoot('/login');
            resolve(false);
          }

        });
      
    });
  }



   //============================================================================
  //Operaciones del crud 
  //============================================================================

  //=============================
  //Cargar usuario
  //=============================
  cargarUsuarios( desde: number = 0){

    let url = URL_SERVICIOS + '/usuario?desde=' + desde;
            
    return this.http.get<RespuestaUsuarios>(url);
            
  }
   //=============================
  //Crear usuario
  //=============================
  crearUsuario(usuario:Usuario){
    
    let url = URL_SERVICIOS + '/usuario';
    
    //se envia al url los datos del usuario para crear el mismo
    return this.http.post(url, usuario)
      .pipe(
        map((resp: any) => {
          Swal.fire({ title: 'Usuario creado', text: usuario.email, icon: 'success' });
          return resp.usuario;
        }), 
        catchError(err => {
          //console.log('Error que viene del servidor', err.error.mensaje);
          Swal.fire({ title: err.error.mensaje , text: err.error.errors.message, icon: 'error' });
          return throwError(err.message);
        })
      );
  }

  //=============================
  //Actualizar usuario
  //=============================

  actualizarUsuario(usuario:Usuario){

    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;
    //console.log(usuario);
    //se envia la data al servidor
    return this.http.put( url,usuario)
    .pipe(
      map((resp: any) => {


        //si el usuario logeado es el que esta actualiando su coreo
        if(usuario._id === this.usuario._id){

          let usuarioDB: Usuario = resp.usuario;
          this.guardatToken( this.token);
        }

        Swal.fire({ title: 'Usuario actualizado', text: usuario.nombre, icon: 'success' });
        return true;
      }), 
      catchError(err => {
        //console.log('Error que viene del servidor', err.error.mensaje);
        Swal.fire({ title: err.error.mensaje , text: err.error.errors.message, icon: 'error' });
        return throwError(err.message);
      })
    );


  }



   //=============================
  //Buscar usuario
  //=============================
  buscarUsuarios( termino: string){

    let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
    return this.http.get(url)
    .pipe(
      map((resp: any) => resp.usuarios )
    );

  }

  //=============================
  //Eliminar usuario
  //=============================

}
