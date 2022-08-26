import { ContentChild, Directive, Input, TemplateRef } from '@angular/core';

@Directive( {
    selector: '[dataGridDetail]'
} )
export class DataGridDetailDirective
{
    constructor()
    {
    }
}

@Directive( {
    selector: 'data-grid-column'
} )
export class DataGridColumnDirective
{
    @Input() title!: string;
    @Input() field!: string;
    @Input() class!: string;
    @Input() colSpan!: number;

    @ContentChild( DataGridDetailDirective, { read: TemplateRef, static: true } )
    itemDetails!: TemplateRef<DataGridDetailDirective>;

    constructor()
    {
    }

}
