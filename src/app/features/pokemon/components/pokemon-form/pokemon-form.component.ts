import { Component, OnInit } from '@angular/core';
import { ModalService } from "../../../../shared/services/modal.service";

@Component( {
    selector: 'pokemon-form',
    templateUrl: './pokemon-form.component.html',
    styleUrls: [ './pokemon-form.component.scss' ]
} )
export class PokemonFormComponent implements OnInit
{

    constructor( private modal: ModalService )
    {
    }

    ngOnInit(): void
    {
    }

    close()
    {
        this.modal.closeAll();
    }
}
