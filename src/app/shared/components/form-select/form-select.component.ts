import { Component, ElementRef, forwardRef, OnInit, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { FormControlValueAccessor } from "../../models/form-control-value-accesor";

@Component( {
    selector: 'form-select',
    templateUrl: './form-select.component.html',
    styleUrls: [ './form-select.component.scss' ],
    host: {
        '[class.form__input]': 'true',
        '[class.ng-invalid]': '!value'
    },
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef( () => FormSelectComponent ),
            multi: true
        }
    ]
} )
export class FormSelectComponent extends FormControlValueAccessor<string> implements OnInit
{

    @ViewChild( 'select', { static: true } ) options!: ElementRef<HTMLSelectElement>;

    invalid: boolean = false;

    constructor()
    {
        super()
    }

    ngOnInit(): void
    {
    }

    override writeValue( value: string )
    {
        this.invalid = !this.options.nativeElement.querySelector( `option[value=${ value }]` );
        super.writeValue( value );
    }

}
