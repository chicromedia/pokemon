import { ControlValueAccessor } from "@angular/forms";
import { Component, Input } from "@angular/core";
import { Guid } from "../utils/guid";

@Component( { template: '' } )
export abstract class FormControlValueAccessor<T = any> implements ControlValueAccessor
{
    @Input()
    public label!: string;
    @Input()
    public placeholder!: string;
    @Input()
    public type = 'text';

    public id: string = Guid.create()
    public disabled: boolean = false;

    private _value!: T;

    public onTouched = () =>
    {
    };
    public onChange = ( value: T ) =>
    {
    };

    writeValue( value: T ): void
    {
        if ( typeof value !== 'undefined' )
        {
            this._value = value;
        }
    }

    set value( value )
    {
        this._value = value;
        this.onChange( value );
    }

    get value()
    {
        return this._value;
    }

    registerOnChange( fn: any ): void
    {
        this.onChange = fn;
    }

    registerOnTouched( fn: any ): void
    {
        this.onTouched = fn;
    }

    setDisabledState( isDisabled: boolean )
    {
        this.disabled = isDisabled;
    }


}
