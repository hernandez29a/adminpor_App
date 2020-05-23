import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { FormGroup,FormControl, Validators, NgForm } from '@angular/forms';
import { Usuario } from '../../interfaces/interfaces';
import { UsuarioModelo } from '../../interfaces/usuario.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slidePrincipal' , {static: true}) slides:IonSlides;

  forma: FormGroup

  loginUser= {
    email:'test1@test.com',
    password:'123456'
  }

  

  usuario:Usuario;

  constructor( private _usuarioService: UsuariosService,
               private router: Router) { }

  
  sonIguales(campo1:string, campo2:string){
    return (group: FormGroup) => {
            
    let pass1 = group.controls[campo1].value;
    let pass2 = group.controls[campo2].value;
            
      if(pass1 === pass2){
        return null
      }
            
      return{
        sonIguales:true
      };
    };
            
  }

  ngOnInit() {
    this.slides.lockSwipes(true);
    this.forma = new FormGroup({
      nombre: new FormControl( null, Validators.required),
      correo: new FormControl(null,[Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
    }, {validators: this.sonIguales('password', 'password2') } );

    this.forma.setValue({
      nombre: 'test',
      correo:'test10@test.com',
      password:'1234',
      password2:'1234',
    });
  }

  login(fLogin:NgForm){
   // console.log('aqui va el login');

    if ( fLogin.invalid ) {
      return;
    }

    this._usuarioService.login( fLogin.value.email,fLogin.value.password  )
                  .subscribe( correcto => this.router.navigate(['/main/tabs/tab1'] )  );
  }

  registro(fRegistro:NgForm){
    
    
    //console.log(fRegistro);
  
    if(fRegistro.invalid){return;}

    if(this.forma.invalid){
      return;
    }

    let usuario = new UsuarioModelo(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password
    );

    this._usuarioService.crearUsuario(usuario)
      .subscribe( correcto => this.router.navigate([this.slides.slideTo(0)]) );
  
  }

  

  mostrarRegistro(){
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
  }

  mostrarLogin(){
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
  }

}
