import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UsuariosService } from '../../services/usuarios.service';
import { NgForm } from '@angular/forms';

declare var window:any;

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  tempImages:string[] = [];
  usuario:Usuario = {};

  constructor( private camera: Camera,
               private _usuarioService: UsuariosService) {}

  ngOnInit(){
    this.usuario = this._usuarioService.getUsuario();
    console.log(this.usuario);
  }

  camara(){
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    };
    this.procesarImagen(options);
  }

  procesarImagen(options: CameraOptions){
    this.camera.getPicture(options).then(( imageData ) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      //let base64Image = 'data:image/jpeg;base64,' + imageData;
      const img = window.Ionic.WebView.convertFileSrc( imageData );

      //insertamos la imagen en el aarreglo
      //this.postService.subirImagen(imageData);
      this.tempImages.push(img);
      console.log('imagen', img);
     }, (err) => {
      // Handle error
      console.log(err);
     });
  }

  galeria(){
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };
    this.procesarImagen(options);
  }

  subirFoto(){

  }

  actualizar(usuario:Usuario){

  //console.log(usuario);
  this.usuario.nombre = usuario.nombre;
    
  if(!this.usuario.google){
    this.usuario.email = usuario.email;
  }

  this._usuarioService.actualizarUsuario( this.usuario)
    .subscribe();

  }

}
