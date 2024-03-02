import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroFecha'
})
export class FiltroFechaPipe implements PipeTransform {

  // transform(value: any[], ...args: any[]): any {
  //   // Aqui escribo la logica para el filtro por fecha
  //   console.log("valores",value) // valores que entran al pipe
  //   console.log("buscado por",args) // fechas
  //   return value;
  // }

  transform(value: any, ...args: any[]): any {
    // Aqui escribo la logica para el filtro por fecha
    console.log("valores",value)
    if(value == "1"){
      return "Pendiente";
    }
    if(value == "2"){
      return "En progreso";
    }
    
    return "Terminado";
    

    // console.log("buscado por",args)
    // return value;
  }

}
