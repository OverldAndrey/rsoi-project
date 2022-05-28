import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'truncate',
})
export class TruncatePipe implements PipeTransform {

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    public transform(value: string, limit = 25, completeWords = false, ellipsis = '...') {
        if (completeWords) {
            // eslint-disable-next-line no-param-reassign
            limit = value.substr(0, limit).lastIndexOf(' ');
        }
        return value.length > limit ? value.substr(0, limit) + ellipsis : value;
    }

}
