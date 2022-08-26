import { Directive, SkipSelf, TemplateRef } from '@angular/core';
import { ModalComponent } from "../components/modal/modal.component";

@Directive( {
    selector: '[modalFooter]'
} )
export class ModalFooterDirective
{

    constructor( @SkipSelf() private modal: ModalComponent,
                 private templateRef: TemplateRef<ModalFooterDirective> )
    {
    }

    ngAfterViewInit()
    {
        if ( this.modal.footerRef )
        {
            this.modal.footerRef.createEmbeddedView( this.templateRef );
        }
    }

    ngOnDestroy()
    {
        if ( this.modal.footerRef )
        {
            this.modal.footerRef.clear();
        }
    }

}
