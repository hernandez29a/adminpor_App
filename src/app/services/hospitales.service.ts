import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { UsuariosService } from './usuarios.service';
import { environment } from '../../environments/environment';
import { RespuestaHospitales, Hospital } from '../interfaces/interfaces';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2'
import { catchError } from "rxjs/operators";
import {Observable, throwError} from 'rxjs'

const URL_SERVICIOS = environment.URL

@Injectable({
  providedIn: 'root'
})
export class HospitalesService {

  hospital:Hospital = {};
  
  constructor( private http: HttpClient,
    private navCtrl: NavController,
    private _usuarioService: UsuariosService,
    private fileTransfer: FileTransfer) { }

//============================================================================
//Operaciones del crud 
//============================================================================

//=============================
//Cargar hospital
//=============================
cargarHospital( desde: number = 0){

  let url = URL_SERVICIOS + '/hospital?desde=' + desde;
          
  return this.http.get<RespuestaHospitales>(url);
          
}

subirImagen(img:string, id:string = null){

  console.log('la imagen es:',img);
  console.log( 'el id del usuario es',id);
  id = this.hospital._id;
  let url = URL_SERVICIOS + '/upload/usuarios/' + id;
  const options: FileUploadOptions = {
    fileKey: 'imagen' 
  }

  const filetranfer: FileTransferObject = this.fileTransfer.create();
  filetranfer.upload(img,url, options )
    .then( data => {
      console.log(data);
    }).catch( err => {
      console.log('error en carga' , err);
    });
}


//=============================
//Crear hospital
//=============================
crearHospital(hospital:Hospital){
    
  let url = URL_SERVICIOS + '/hoapital';
  
  //se envia al url los datos del usuario para crear el mismo
  return this.http.post(url, hospital)
    .pipe(
      map((resp: any) => {
        Swal.fire({ title: 'Hospital creado', text: hospital.nombre, icon: 'success' });
        return resp.hospital;
      }), 
      catchError(err => {
        //console.log('Error que viene del servidor', err.error.mensaje);
        Swal.fire({ title: err.error.mensaje , text: err.error.errors.message, icon: 'error' });
        return throwError(err.message);
      })
    );
}

//=============================
//Actualizar hospital
//=============================


//=============================
//Buscar hospital
//=============================
buscarHospitales( termino: string){

  let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
  return this.http.get(url)
  .pipe(
    map((resp: any) => resp.hospitales )
  );

}

//=============================
//Eliminar hospital
//=============================

borrarHospital(id: string){

  let url = URL_SERVICIOS + '/hospital/' + id;
  url += '?token=' + this._usuarioService.token;
  //url += '?token=' + this.token;
  return this.http.delete(url)
  .pipe(
    map(resp => {
      Swal.fire({ title: 'Hospital Borrado', text: 'El hospital ha sido borrado ' , icon: 'success' });
      return true;
    })
  );



}


}
