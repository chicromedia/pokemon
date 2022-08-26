import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { FormControlValueAccessor } from "../../models/form-control-value-accesor";

@Component( {
    selector: 'form-range',
    templateUrl: './form-range.component.html',
    styleUrls: [ './form-range.component.scss' ],
    host: {
        '[class.form__input]': 'true'
    },
    providers: [
        {
            provide: FormRangeComponent,
            useExisting: forwardRef( () => FormRangeComponent ),
            multi: true
        }
    ]
} )
export class FormRangeComponent extends FormControlValueAccessor implements OnInit
{

    @Input()
    min: number = 0;
    @Input()
    max: number = 100;

    constructor()
    {
        super()
    }

    ngOnInit(): void
    {
    }

}
