import { Component, OnInit } from '@angular/core';
import { ModalService } from "../../../../shared/services/modal.service";
import { PokemonFormComponent } from "../pokemon-form/pokemon-form.component";

@Component( {
    selector: 'pokemon-header',
    templateUrl: './pokemon-header.component.html',
    styleUrls: [ './pokemon-header.component.scss' ]
} )
export class PokemonHeaderComponent implements OnInit
{

    constructor( private modal: ModalService )
    {
    }

    ngOnInit(): void
    {
    }

    newPokemon()
    {
        this.modal.open( {
            title: 'Nuevo pokemon',
            component: PokemonFormComponent,
            size: "lg"
        } )
    }
}
