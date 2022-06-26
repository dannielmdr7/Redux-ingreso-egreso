import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

@Pipe({
  name: 'ordenIngreso'
})
export class OrdenIngresoPipe implements PipeTransform {

  transform(items: IngresoEgreso[]): IngresoEgreso[] {
    const ingresoItems = items.filter(item => item.tipo === 'ingreso');
    const egresoItems = items.filter(item => item.tipo === 'egreso');
    const orderItems = [...ingresoItems,...egresoItems]

    return orderItems;
  }

}
