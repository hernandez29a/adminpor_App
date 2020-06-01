import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { UsuariosService } from './usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class MedicosService {

  constructor(private http: HttpClient,
              private navCtrl: NavController,
              private _usuarioService: UsuariosService) { }


//============================================================================
//Operaciones del crud 
//============================================================================

//=============================
//Cargar medico
//=============================

//=============================
//Crear medico
//=============================

//=============================
//Actualizar medico
//=============================

//=============================
//Buscar medico
//=============================

//=============================
//Eliminar medico
//=============================

}
