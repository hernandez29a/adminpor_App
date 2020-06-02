import { Component, OnInit } from '@angular/core';
import { Medico, Hospital } from '../../../interfaces/interfaces';
import { MedicosService } from '../../../services/medicos.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ModalController } from '@ionic/angular';
import { HospitalesService } from '../../../services/hospitales.service';

declare var window:any;

@Component({
  selector: 'app-medico-actualizar',
  templateUrl: './medico-actualizar.component.html',
  styleUrls: ['./medico-actualizar.component.scss'],
})
export class MedicoActualizarComponent implements OnInit {

  imagenTemp:string;

  medico:Medico = {
    nombre:''
  }

  desde: number = 0;
  hospitales:Hospital[] = [];

  constructor(private _medicoService: MedicosService,
              private _hospitalService: HospitalesService,
              private camera: Camera,
              private modalCtrl: ModalController ) { }

  ngOnInit() {
    this.cargarHospitales();
    const medico = this.medico;
    return medico;
  }
  
  cargarHospitales(){
    this._hospitalService.cargarHospital( this.desde)
      .subscribe( (resp: any) => {       
        //nos traemos los usuarios del servidor
        this.hospitales = resp.hospitales;
        //console.log(this.hospitales);
        
      });
  }

  camara(medico:Medico){
    console.log('click en la camara');
    this.medico._id = medico._id
    
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    };
    this.procesarImagen(options,this.medico._id );
  }

  procesarImagen(options: CameraOptions, id:string){
    

    this.camera.getPicture(options).then(( imageData ) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      //let base64Image = 'data:image/jpeg;base64,' + imageData;
      const img = window.Ionic.WebView.convertFileSrc( imageData );

      //insertamos la imagen en el aarreglo
      this._medicoService.subirImagen(imageData,id);
      this.imagenTemp = img;
     // console.log('imagen', img);
      return img;
      
     }, (err) => {
      // Handle error
      console.log(err);
     });
  }

  galeria(medico:Medico){
    this.medico._id = medico._id
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };
    this.procesarImagen(options,this.medico._id);
  }

  actualizarMedico( medico:Medico ){

    //console.log(medico);

    this.medico.nombre = medico.nombre
    this.medico.hospital = medico.hospital

    this._medicoService.actualizarMedico(this.medico)
      .subscribe();
      this.modalCtrl.dismiss();
  }

  regresar() {
    this.modalCtrl.dismiss();
  }



}
