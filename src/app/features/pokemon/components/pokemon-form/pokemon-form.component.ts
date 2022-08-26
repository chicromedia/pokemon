import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from "../../../../shared/services/modal.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IPokemon } from "../../interfaces/pokemon";
import { PokemonService } from "../../services/pokemon.service";

@Component( {
    selector: 'pokemon-form',
    templateUrl: './pokemon-form.component.html',
    styleUrls: [ './pokemon-form.component.scss' ]
} )
export class PokemonFormComponent implements OnInit
{

    @Input()
    data!: IPokemon;

    formGroup!: FormGroup;
    errorMessage!: string;

    constructor( private fb: FormBuilder,
                 private modal: ModalService,
                 private service: PokemonService )
    {
    }

    ngOnInit(): void
    {
        this.formGroup = this.fb.group( {
            id: null,
            name: [ '', Validators.required ],
            image: [ '', Validators.required ],
            type: [ 'fire', Validators.required ],
            hp: [ 50 ],
            idAuthor: 1,
            attack: [ 50 ],
            defense: [ 50 ]
        } )

        if ( this.data )
        {
            this.formGroup.patchValue( this.data )
        }
    }

    submit()
    {
        if ( this.formGroup.valid )
        {
            this.service.save( this.formGroup.value ).subscribe( {
                next: () => this.modal.closeAll(),
                error: ( { error } ) => this.errorMessage = error!.data
            } )
        }
    }

    close()
    {
        this.modal.closeAll();
    }

}
