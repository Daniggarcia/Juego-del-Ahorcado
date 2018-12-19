import { Component } from '@angular/core';
import { HttpClient }  from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {

  public title: string = 'Ahorcado';
  public palabra: string = this.palabra;
  public palabraOculta: string = '';
  public try: number = 0;
  public win: boolean = false;
  public lost: boolean = false;

  public letras: String[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
  'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's',
  't', 'u', 'v', 'w', 'x', 'y', 'z', 
  
  'á', 'é', 'í', 'ó', 'ú'];


  public constructor (private _httpClient: HttpClient) {

    this._httpClient.get('assets/diccionario.json').subscribe( (palabras: string) => {
      const juego: number = Math.floor(Math.random() * palabras.length);
      this.palabra = palabras[juego];
      this.palabraOculta = '_ '.repeat(this.palabra.length);
      });
  }

  mostrar(){

    document.getElementById('oculto').style.display = 'block';
    document.getElementById('oculto2').style.display = 'block';
    document.getElementById('oculto3').style.display = 'block';
    document.getElementById('oculto4').style.display = 'block';
    document.getElementById('oculto5').style.display = 'block';
  
  }


  comprobar(letra) {

    this.trueLetra(letra);

    const wordsHideArr = this.palabraOculta.split(' ');

    for (let i = 0; i < this.palabra.length; i ++) {
      
      if ( this.palabra[i] === letra ){
        wordsHideArr[i] = letra;
      }
      
    }

    this.palabraOculta = wordsHideArr.join(' ');
    this.ComprobarWin();
  }

  desactivaBoton() {

}

  ComprobarWin(){

    const palabraArr = this.palabraOculta.split(' ');
    //Eliminamos espacios.
    const palabraEvaluar = palabraArr.join('');

    if (palabraEvaluar === this.palabra){
      this.win = true;
      console.log("¡Ganastes!");
    }
    if (this.try >= 9){
      this.lost = true;
      console.log('¡Perdistes capullo');
    }

  }


  trueLetra( letra ){

    
    if( this.palabra.indexOf(letra)>= 0) {
        //Encontro la letra
        //console.log("La letra existe " + letra);
    }else{
        //No encontro letra
        //console.log("La letra No existe " + letra);
        this.try ++;
    }

  }


  
}
