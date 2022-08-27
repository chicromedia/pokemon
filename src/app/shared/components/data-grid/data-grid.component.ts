import { Component, ContentChildren, Input, OnInit, QueryList } from '@angular/core';
import { DataGridColumnDirective } from "../../directives/data-grid-column.directive";

@Component( {
    selector: 'data-grid',
    templateUrl: './data-grid.component.html',
    styleUrls: [ './data-grid.component.scss' ]
} )
export class DataGridComponent implements OnInit
{

    @Input()
    collection!: any[] | null;
    @Input()
    filterField!: string;
    @Input()
    filterValue!: string;

    @ContentChildren( DataGridColumnDirective ) columns!: QueryList<DataGridColumnDirective>;

    constructor()
    {
    }

    ngOnInit(): void
    {
    }

    context( dataItem: any, index: number )
    {
        return { $implicit: dataItem, ...dataItem, index };
    }

}
