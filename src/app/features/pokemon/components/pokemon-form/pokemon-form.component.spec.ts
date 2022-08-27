import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { PokemonFormComponent } from './pokemon-form.component';
import { PokemonService } from "../../services/pokemon.service";
import { ModalService } from "../../../../shared/services/modal.service";
import { of } from "rxjs";
import { IPokemon } from "../../interfaces/pokemon";
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { FormInputComponent } from "../../../../shared/components/form-input/form-input.component";
import { FormRangeComponent } from "../../../../shared/components/form-range/form-range.component";
import { IconComponent } from "../../../../shared/components/icon/icon.component";
import { FormSelectComponent } from "../../../../shared/components/form-select/form-select.component";

describe( 'PokemonFormComponent', () =>
{
    let component: PokemonFormComponent;
    let fixture: ComponentFixture<PokemonFormComponent>;
    let service: PokemonService;
    let modal: ModalService;
    let pokemon: IPokemon;

    beforeEach( async () =>
    {
        await TestBed.configureTestingModule( {
            imports: [
                HttpClientTestingModule,
                FormsModule,
                ReactiveFormsModule
            ],
            declarations: [
                PokemonFormComponent,
                FormInputComponent,
                FormRangeComponent,
                FormSelectComponent,
                IconComponent
            ],
            providers: [
                PokemonService,
                ModalService,
                FormBuilder
            ]
        } ).compileComponents();

        pokemon = {
            id: null,
            name: 'Charmander',
            image: 'https://image.com/charmander',
            attack: 90,
            defense: 80
        }

        fixture = TestBed.createComponent( PokemonFormComponent );
        component = fixture.componentInstance;
        fixture.detectChanges();

        service = TestBed.inject( PokemonService );
        modal = TestBed.inject( ModalService );
    } );

    it( 'should create', () =>
    {
        expect( component ).toBeTruthy();
    } );

    it( 'should create pokemon correctly when form is valid', fakeAsync( () =>
    {
        const serviceSpy = spyOn( service, "save" ).and.returnValue( of( { ...pokemon, id: 1 } ) );
        const modalSpy = spyOn( modal, "closeAll" );
        component.formGroup.patchValue( pokemon );

        component.submit();
        flush();

        expect( serviceSpy ).toHaveBeenCalledOnceWith( component.formGroup.value );
        expect( modalSpy ).toHaveBeenCalled();
    } ) );

    it( 'should update form when date is defined', () =>
    {
        component.data = { ...pokemon, name: 'Ivysaur' }

        component.ngOnInit();

        expect( component.formGroup.value.name ).toEqual( component.data.name );
    } );

    it( 'should ignore save when form is invalid', fakeAsync( () =>
    {
        const serviceSpy = spyOn( service, "save" ).and.returnValue( of( { ...pokemon, id: 1 } ) );
        const modalSpy = spyOn( modal, "closeAll" );
        component.formGroup.patchValue( { name: '' } );

        component.submit();
        flush();

        expect( serviceSpy ).not.toHaveBeenCalled();
        expect( modalSpy ).not.toHaveBeenCalled();
    } ) );
} );
