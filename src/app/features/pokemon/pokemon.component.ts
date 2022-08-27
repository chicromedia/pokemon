import { Component, OnInit } from '@angular/core';
import { PokemonService } from "./services/pokemon.service";
import { IPokemon } from "./interfaces/pokemon";
import { Observable } from "rxjs";
import { PokemonFormComponent } from "./components/pokemon-form/pokemon-form.component";
import { ModalService } from "../../shared/services/modal.service";

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
    search!: string;

    constructor( private pokemon: PokemonService, private modal: ModalService )
    {
    }

    ngOnInit(): void
    {
        this.pokemon.loadList().subscribe();
    }

    filterable: any = ( item: IPokemon ) =>
    {
        return !!this.search ? item.name == this.search : true;
    };

    edit( pokemon: IPokemon )
    {
        this.modal.open( {
            title: `Editar pokemon #${ pokemon.id }`,
            component: PokemonFormComponent,
            context: { data: pokemon },
            size: "lg"
        } )
    }

    remove( pokemon: IPokemon )
    {
        this.modal.confirm(
            {
                message: `¿Seguro quiere eliminar a ${ pokemon.name }?`,
                waitForRequest$: this.pokemon.remove( pokemon.id )
            }
        ).subscribe(
            () => this.modal.closeAll()
        )
    }
}
