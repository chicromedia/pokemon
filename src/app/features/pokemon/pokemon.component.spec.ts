import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonComponent } from './pokemon.component';
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe( 'PokemonListComponent', () =>
{
    let component: PokemonComponent;
    let fixture: ComponentFixture<PokemonComponent>;

    beforeEach( async () =>
    {
        await TestBed.configureTestingModule( {
            imports: [ HttpClientTestingModule ],
            declarations: [ PokemonComponent ]
        } )
            .compileComponents();

        fixture = TestBed.createComponent( PokemonComponent );
        component = fixture.componentInstance;
        fixture.detectChanges();
    } );

    it( 'should create', () =>
    {
        expect( component ).toBeTruthy();
    } );
} );
