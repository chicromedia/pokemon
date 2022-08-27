import { Pipe, PipeTransform } from '@angular/core';

@Pipe( {
    name: 'filterBy'
} )
export class FilterByPipe implements PipeTransform
{

    transform<T = any>( items: T[], field: keyof T, value: any ): T[]
    {
        const predicate = ( item: any ) =>
        {
            if ( field && !!value )
            {
                const find = item[ field ];
                return typeof find == "string"
                    ? find.toLowerCase().includes( value.toLowerCase() )
                    : find === value;
            }
            return true;
        }
        return !!value ? items.filter( predicate ) : items;
    }


}
