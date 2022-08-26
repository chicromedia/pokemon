import {
    ApplicationRef,
    ComponentRef,
    createComponent,
    Inject,
    Injectable,
    Injector,
    RendererFactory2,
    Type
} from '@angular/core';
import { DOCUMENT } from "@angular/common";
import { IModalSetup } from "../interfaces/modal";
import { ModalRef } from "../models/modal-ref";
import { ModalComponent } from "../components/modal/modal.component";
import { mergeMap, Observable, of, take } from "rxjs";
import { ConfirmComponent } from "../components/confirm/confirm.component";

@Injectable( {
    providedIn: 'root'
} )
export class ModalService
{
    private readonly modalStack: Set<ComponentRef<ModalComponent>> = new Set<ComponentRef<ModalComponent>>();

    constructor( @Inject( DOCUMENT ) private document: any,
                 private applicationRef: ApplicationRef,
                 private injector: Injector,
                 private rendererFactory: RendererFactory2 )
    {
    }

    open<T = any>( setup: IModalSetup<T> ): ModalRef<T>
    {
        const renderer = this.rendererFactory.createRenderer( null, null );
        const windowRef = this.createComponent( ModalComponent )
        const contentRef = this.createComponent( setup.component, windowRef.injector );

        this.applicationRef.attachView( windowRef.hostView );
        windowRef.instance.contentRef.insert( contentRef.hostView );
        this.document.body.append( windowRef.location.nativeElement );

        renderer.addClass( this.document.body, 'modal__open' );
        this.registerWindow( windowRef );

        const modalRef = new ModalRef<T>( {
            windowRef,
            contentRef
        } );

        modalRef.hidden.pipe( take( 1 ) ).subscribe( () =>
        {
            this.modalStack.delete( modalRef.windowRef );
            if ( !this.modalStack.size )
            {
                renderer.removeClass( this.document.body, 'modal__open' );
            }
        } );

        if ( setup.context )
        {
            Object.assign( contentRef.instance, setup.context )
        }

        Object.assign( windowRef.instance, {
            title: setup.title,
            close: modalRef.close.bind( modalRef ),
            size: setup.size
        } )
        return modalRef;
    }

    confirm( setup: { message: string, waitForRequest$?: Observable<any> } ): Observable<void>
    {
        const confirm = this.open( {
            component: ConfirmComponent,
            context: { message: setup.message }
        } );
        return confirm.contentRef.instance.confirm$.pipe(
            mergeMap( () => setup.waitForRequest$ ? setup.waitForRequest$ : of( true ) ),
            take( 1 )
        );
    }

    closeAll()
    {
        this.modalStack.forEach( modal => modal.instance.close() );
    }

    private createComponent<T>( component: Type<T>, injector?: Injector )
    {
        return createComponent( component, {
            environmentInjector: this.applicationRef.injector,
            elementInjector: injector || this.injector
        } );
    }

    private registerWindow( nsWindow: ComponentRef<ModalComponent> )
    {
        this.modalStack.add( nsWindow );
        nsWindow.onDestroy( () =>
        {
            if ( this.modalStack.has( nsWindow ) )
            {
                this.modalStack.delete( nsWindow );
            }
        } );
    }
}
