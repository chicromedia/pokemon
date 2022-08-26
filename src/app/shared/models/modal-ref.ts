import { ComponentRef } from "@angular/core";
import { ModalComponent } from "../components/modal/modal.component";
import { Subject } from "rxjs";

export class ModalRef<T = any>
{
    windowRef!: ComponentRef<ModalComponent>;
    contentRef!: ComponentRef<T>;
    readonly hidden: Subject<void> = new Subject<void>();

    constructor( props: Partial<ModalRef<T>> = {} )
    {
        Object.assign( this, props );
    }

    get instance()
    {
        return this.contentRef!.instance;
    }

    close()
    {
        const { nativeElement } = this.windowRef.location;
        nativeElement.parentNode.removeChild( nativeElement );
        this.hidden.next();
        this.windowRef.destroy();

        if ( this.contentRef )
        {
            this.contentRef.destroy();
        }

        this.windowRef = <any> null;
        this.contentRef = <any> null;
    }
}
