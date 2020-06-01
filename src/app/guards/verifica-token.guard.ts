import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuariosService } from '../services/usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {

  constructor(private _usuarioService: UsuariosService,
              private router: Router){}


  canActivate(): Promise<boolean> | boolean {
    console.log('Token Guard');
    let token = this._usuarioService.token;
    let payload = JSON.parse( atob(token.split('.')[1]) );
    
    let expirado = this.expirado(payload.exp);
    
    //Sacar al usuario si el token expiro
    if(expirado){
      this.router.navigate(['/login']);
      return false;
    }

    //console.log(payload);

    return this.verificaRenueva( payload.exp );
    //return true;
  }

  verificaRenueva( fechaExp: number): Promise<boolean>{
    
    return new Promise( (resolve, reject) => {
       //llevar la fecha de expiracion de segundos a mili segundos
      let tokenExp = new Date( fechaExp * 1000 );

      let ahora = new Date();
      ahora.setTime( ahora.getTime() + (1 * 60 * 60 *1000) );
      
      //console.log(tokenExp);
      //console.log(ahora);

      if( tokenExp.getTime() > ahora.getTime() ){
        resolve (true);
      }else{
        
        this._usuarioService.renuevaToken()
          .subscribe( () => {
            resolve(true);
          }, () => {
            this.router.navigate(['/login']);
            resolve(false);
          });

      }

    });
  }


  expirado( fechaExp: number){

    let ahora = new Date().getTime() / 1000;

    if(fechaExp < ahora){
      return true;
    }else{
      return false;
    }

  }

}
