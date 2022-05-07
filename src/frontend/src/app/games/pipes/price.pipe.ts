import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'price',
})
export class PricePipe implements PipeTransform {

    public transform(price: number): string {
        if (price === 0) {
            return 'Бесплатно';
        }

        return `${price} руб.`;
    }

}
