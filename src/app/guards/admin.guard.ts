import { Injectable } from '@angular/core';
import { CanLoad, CanActivate, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuariosService } from '../services/usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor( private _usuarioService: UsuariosService){}

  role: string ;


  canActivate(): Observable<boolean> | Promise<boolean> | boolean {

    //this._usuarioService.obtenerRol.
    if(this._usuarioService.usuario.role === 'ADMIN_ROLE'){
      return true;
    }else{
      console.log('Bloqueado por el ADMIN GUARD');
      this._usuarioService.logout();
      return false;
    }

  }
/*
  carrgarRol(role:string){
    this._usuarioService.obtenerRol()
    .subscribe( (resp:any) => {
      //console.log( 'el role es ', resp.usuario.role);
      this.role = resp.usuario.role;
      console.log(role);
      return this.role;
    }) 
  }
  */
}
