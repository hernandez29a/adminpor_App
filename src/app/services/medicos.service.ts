import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { UsuariosService } from './usuarios.service';
import { Medico, RespuestaMedicos } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer/ngx';

const URL_SERVICIOS = environment.URL

@Injectable({
  providedIn: 'root'
})
export class MedicosService {

  medico:Medico = {};

  constructor(private http: HttpClient,
              private navCtrl: NavController,
              private _usuarioService: UsuariosService,
              private fileTransfer: FileTransfer ) { }


//=============================
//Guardar la imagen del hospital
//=============================

subirImagen(img:string, id:string ){

  console.log('la imagen es:',img);
  console.log( 'el id del usuario es',id);
  //id = this.hospital._id;
  let url = URL_SERVICIOS + '/upload/medicos/' + id;
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

//============================================================================
//Operaciones del crud 
//============================================================================

//=============================
//Cargar medico
//=============================
cargarMedico( desde: number = 0){

  let url = URL_SERVICIOS + '/medico?desde=' + desde;
          
  return this.http.get<RespuestaMedicos>(url);
          
}

//=============================
//Crear medico
//=============================
crearMedico(medico:Medico){

  let url = URL_SERVICIOS + '/medico';
  url += '?token=' + this._usuarioService.token;

  return this.http.post(url,medico)
  .pipe(
    map((resp: any) => {
      Swal.fire({ title: 'Medico Creado', text: medico.nombre , icon: 'success' });
      return resp.medico;
    })
  );


}

//=============================
//Actualizar medico
//=============================
actualizarMedico(medico:Medico){

  let url = URL_SERVICIOS + '/medico';
  url += '/' + medico._id;
  url += '?token=' + this._usuarioService.token;

  return this.http.put( url, medico)
  .pipe(
    map((resp: any) => {
      Swal.fire({ title: 'Medico Actualuizado', text: medico.nombre , icon: 'success' });
      return resp.medico;
    })
  );
}

//=============================
//Buscar medico
//=============================
buscarMedicos( termino: string){

  let url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;
  return this.http.get(url)
  .pipe(
    map((resp: any) => resp.medicos )
  );

}

//=============================
//Eliminar medico
//=============================
borrarMedico(id: string){

  let url = URL_SERVICIOS + '/medico/' + id;
  url += '?token=' + this._usuarioService.token;
  //url += '?token=' + this.token;
  return this.http.delete(url)
  .pipe(
    map(resp => {
      Swal.fire({ title: 'Medico Borrado', text: 'El médico ha sido borrado ' , icon: 'success' });
      return true;
    })
  );



}

}
