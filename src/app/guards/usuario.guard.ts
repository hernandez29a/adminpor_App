import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuariosService } from '../services/usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuard implements CanLoad {

  constructor( private _usuarioService: UsuariosService){}

  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    return this._usuarioService.validaToken();
  }
}
