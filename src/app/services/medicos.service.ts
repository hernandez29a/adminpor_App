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
              private _usuarioService: UsuariosService) { }


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

//=============================
//Actualizar medico
//=============================

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
