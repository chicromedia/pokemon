import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonHeaderComponent } from './pokemon-header.component';
import { ModalService } from "../../../../shared/services/modal.service";
import { FormInputComponent } from "../../../../shared/components/form-input/form-input.component";
import { FormRangeComponent } from "../../../../shared/components/form-range/form-range.component";
import { FormSelectComponent } from "../../../../shared/components/form-select/form-select.component";
import { IconComponent } from "../../../../shared/components/icon/icon.component";
import { ModalComponent } from "../../../../shared/components/modal/modal.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { BrowserTestingModule } from "@angular/platform-browser/testing";
import { PokemonFormComponent } from "../pokemon-form/pokemon-form.component";
import { By } from "@angular/platform-browser";

describe( 'PokemonHeaderComponent', () =>
{
    let component: PokemonHeaderComponent;
    let fixture: ComponentFixture<PokemonHeaderComponent>;
    let modal: ModalService;

    beforeEach( async () =>
    {
        await TestBed.configureTestingModule( {
            imports: [
                FormsModule,
                ReactiveFormsModule,
                HttpClientTestingModule,
            ],
            declarations: [
                PokemonHeaderComponent,
                PokemonFormComponent,
                FormInputComponent,
                FormRangeComponent,
                FormSelectComponent,
                ModalComponent,
                IconComponent
            ]
        } ).overrideModule( BrowserTestingModule, {
            set: {
                entryComponents: [ ModalComponent, PokemonFormComponent ]
            }
        } ).compileComponents();

        fixture = TestBed.createComponent( PokemonHeaderComponent );
        component = fixture.componentInstance;
        fixture.detectChanges();

        modal = TestBed.inject( ModalService );
    } );

    it( 'should create', () =>
    {
        expect( component ).toBeTruthy();
    } );

    it( 'should open modal for new pokemon', () =>
    {
        const button = fixture.debugElement.query( By.css( "button.btn__primary" ) );

        button.nativeElement.click();
        fixture.detectChanges();

        expect( document.querySelector( 'modal' ) ).toBeTruthy();
        expect( document.body.classList.contains( 'modal__open' ) ).toBeTruthy();
    } );

    it( 'should emit change when the input search change of value', () =>
    {
        const changeSpy = spyOn( component.change, "next" );
        const input = fixture.debugElement.query( By.directive( FormInputComponent ) );

        input.componentInstance.value = "Charmandar";
        fixture.detectChanges();

        expect( changeSpy ).toHaveBeenCalledOnceWith( "Charmandar" );
    } );
} );
