import { Component, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { IconKeys, Icons } from "../../utils/icon";

@Component( {
    selector: 'icon',
    templateUrl: './icon.component.html',
    styleUrls: [ './icon.component.scss' ],
    host: {
        '[class.icon]': 'true'
    }
} )
export class IconComponent implements OnInit, OnChanges
{
    @Input()
    name!: IconKeys;
    @Input()
    color: string = 'currentColor';
    @Input()
    size: number = 24;

    @ViewChild( 'svg', { static: true } ) container!: ElementRef

    constructor( private renderer: Renderer2 )
    {
    }

    ngOnInit(): void
    {
        this.refreshIcon( this.name )
    }

    ngOnChanges( { name }: SimpleChanges )
    {
        if ( name.currentValue )
        {
            this.refreshIcon( name.currentValue )
        }
    }

    private refreshIcon( key: IconKeys )
    {
        this.renderer.setProperty( this.container.nativeElement, 'innerHTML', Icons[ key ] )
    }
}
