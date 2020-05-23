import { Component, OnInit, Input } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() titulo: string;

  constructor( private _usuarioService: UsuariosService) { }

  ngOnInit() {}

  logout(){
    
    /**
     esto es para inicializar la paginacion inicial de los servicios
     this.postsService.paginaPosts = 0;
     */
    //this.suministroService.paginaSumi = 0;
    this._usuarioService.logout();
    //console.log('aqui se sale de la app');
    

    //console.log('salir de la aplicacion')
  }

}
