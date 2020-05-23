import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environments/environment';


const URL_SERVICIOS = environment.URL;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {

    let url = URL_SERVICIOS + '/img';

    //Si no hay imagen
    if(!img){
      return url + '/usuarios/xxx';
    }

    //si es una imagen de google , me retorne la imagen que esta 
    if(img.indexOf('https') >= 0){
      return img;
    }

    //para el resto de las imagenes
    switch( tipo ){

      case 'usuario':
         url += '/usuarios/' + img;
      break;

      case 'medico':
        url += '/medicos/' + img;
      break;

      case 'hospital':
        url += '/hospitales/' + img;
      break;

      default:
        console.log('tipo de imagen no existe, usuario, medicos, hospital');
        url += 'usuario/xxx';
    }

    return url;
  }

}
