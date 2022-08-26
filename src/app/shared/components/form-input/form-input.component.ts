import { Component, forwardRef, OnInit } from '@angular/core';
import { FormControlValueAccessor } from "../../models/form-control-value-accesor";

@Component( {
    selector: 'form-input',
    templateUrl: './form-input.component.html',
    styleUrls: [ './form-input.component.scss' ],
    host: {
        '[class.form__input]': 'true'
    },
    providers: [
        {
            provide: FormInputComponent,
            useExisting: forwardRef( () => FormInputComponent ),
            multi: true
        }
    ]
} )
export class FormInputComponent extends FormControlValueAccessor<string> implements OnInit
{

    constructor()
    {
        super()
    }

    ngOnInit(): void
    {
    }

}
