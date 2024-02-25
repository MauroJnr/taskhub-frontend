import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroFecha'
})
export class FiltroFechaPipe implements PipeTransform {

  transform(value: any[], ...args: any[]): any {
    // Aqui escribo la logica para el filtro por fecha
    console.log("valores",value)
    console.log("buscado por",args)
    return value;
  }

}
