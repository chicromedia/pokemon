import { Component, OnInit } from '@angular/core';
import { Subject } from "rxjs";
import { ModalService } from "../../services/modal.service";

@Component( {
    selector: 'confirm',
    templateUrl: './confirm.component.html',
    styleUrls: [ './confirm.component.scss' ]
} )
export class ConfirmComponent implements OnInit
{

    message!: string;
    confirm$: Subject<void> = new Subject<void>();

    constructor( private modal: ModalService )
    {
    }

    ngOnInit(): void
    {
    }

    close()
    {
        this.modal.closeAll()
    }
}
