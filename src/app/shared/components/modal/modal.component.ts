import { Component, HostListener, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';

@Component( {
    selector: 'modal',
    templateUrl: './modal.component.html',
    styleUrls: [ './modal.component.scss' ],
    host: {
        '[class.modal]': 'true'
    },
    encapsulation: ViewEncapsulation.None
} )
export class ModalComponent implements OnInit
{
    title!: string;
    size!: 'lg' | 'sm' | 'xl';

    close!: () => void;

    @ViewChild( 'content', { read: ViewContainerRef, static: true } ) contentRef!: ViewContainerRef;
    @ViewChild( 'footer', { read: ViewContainerRef, static: true } ) footerRef!: ViewContainerRef;

    constructor()
    {
    }

    ngOnInit(): void
    {
    }

    @HostListener( 'window:keydown', [ '$event' ] )
    keydown( event: KeyboardEvent )
    {
        if ( event.key == 'Escape' )
        {
            this.close();
        }
    }

}
