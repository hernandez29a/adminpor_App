import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../../interfaces/interfaces';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { HospitalesService } from '../../../services/hospitales.service';
import { ModalController } from '@ionic/angular';

declare var window:any;

@Component({
  selector: 'app-hospital-actualizar',
  templateUrl: './hospital-actualizar.component.html',
  styleUrls: ['./hospital-actualizar.component.scss'],
})
export class HospitalActualizarComponent implements OnInit {

  imagenTemp:string;

  hospital:Hospital = {
    nombre: ''
  };

  constructor(private _hospitalService: HospitalesService,
              private modalCtrl: ModalController,
              private camera: Camera) { }

  ngOnInit() {
    const hospital = this.hospital;
    return hospital;
  }

  camara(hospital:Hospital){
    console.log('click en la camara');
    this.hospital._id = hospital._id
    
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    };
    this.procesarImagen(options,this.hospital._id );
  }

  procesarImagen(options: CameraOptions, id:string){
    

    this.camera.getPicture(options).then(( imageData ) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      //let base64Image = 'data:image/jpeg;base64,' + imageData;
      const img = window.Ionic.WebView.convertFileSrc( imageData );

      //insertamos la imagen en el aarreglo
      this._hospitalService.subirImagen(imageData,id);
      this.imagenTemp = img;
     // console.log('imagen', img);
      return img;
      
     }, (err) => {
      // Handle error
      console.log(err);
     });
  }

  galeria(hospital:Hospital){
    this.hospital._id = hospital._id
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };
    this.procesarImagen(options,this.hospital._id);
  }

  actualizarHospital(hospital:Hospital){
    //console.log(hospital)

    this.hospital.nombre = hospital.nombre
    

    /*this._hospitalService.actualizarHospital(this.hospital)
      .subscribe();*/
      this.modalCtrl.dismiss();
  }

  regresar() {
    this.modalCtrl.dismiss();
  }

}
