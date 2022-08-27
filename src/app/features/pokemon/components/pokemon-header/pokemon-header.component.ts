import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { ModalService } from "../../../../shared/services/modal.service";
import { PokemonFormComponent } from "../pokemon-form/pokemon-form.component";
import { Subject } from "rxjs";

@Component( {
    selector: 'pokemon-header',
    templateUrl: './pokemon-header.component.html',
    styleUrls: [ './pokemon-header.component.scss' ]
} )
export class PokemonHeaderComponent implements OnInit, OnDestroy
{

    @Output()
    change: Subject<string> = new Subject<string>();

    private _search: string = '';
    private readonly destroy$: Subject<void> = new Subject<void>();

    constructor( private modal: ModalService )
    {
    }

    ngOnInit(): void
    {
    }

    set search( value: string )
    {
        this._search = value;
        this.change.next( value );
    }

    get search()
    {
        return this._search;
    }

    newPokemon()
    {
        this.modal.open( {
            title: 'Nuevo pokemon',
            component: PokemonFormComponent,
            size: "lg"
        } )
    }

    ngOnDestroy()
    {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
