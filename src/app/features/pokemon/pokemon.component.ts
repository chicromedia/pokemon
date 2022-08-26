import { Component, OnInit } from '@angular/core';
import { PokemonService } from "./services/pokemon.service";
import { IPokemon } from "./interfaces/pokemon";
import { Observable } from "rxjs";

@Component( {
    selector: 'pokemon',
    templateUrl: './pokemon.component.html',
    styleUrls: [ './pokemon.component.scss' ],
    host: {
        '[class.container]': 'true'
    }
} )
export class PokemonComponent implements OnInit
{

    collection$: Observable<IPokemon[]> = this.pokemon.collection$;

    constructor( private pokemon: PokemonService )
    {
    }

    ngOnInit(): void
    {
        this.pokemon.loadList().subscribe();
    }

    edit( pokemon: IPokemon )
    {

    }

    remove( id: number )
    {

    }
}
