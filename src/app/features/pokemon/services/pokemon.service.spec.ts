import { TestBed } from '@angular/core/testing';
import { PokemonService } from './pokemon.service';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { IPokemon } from "../interfaces/pokemon";
import { mergeMap, of } from "rxjs";

describe( 'PokemonService', () =>
{
    let service: PokemonService;
    let http: HttpClient;
    let mocks: IPokemon[] = [
        {
            id: 1,
            name: "Charmander",
            image: "https://assets.pokemon.com/charmandar.png",
            attack: 50,
            defense: 30,
            type: "fire",
            hp: 10,
            id_author: 1
        },
        {
            id: 2,
            name: "Pikachu",
            image: "https://assets.pokemon.com/pikachu.png",
            attack: 50,
            defense: 80,
            type: "thunder",
            hp: 70,
            id_author: 1
        }
    ]

    beforeEach( () =>
    {
        TestBed.configureTestingModule( {
            imports: [ HttpClientTestingModule ]
        } );
        service = TestBed.inject( PokemonService );
        http = TestBed.inject( HttpClient );
    } );

    it( 'should be created', () =>
    {
        expect( service ).toBeTruthy();
    } );

    it( 'should load collection correctly', ( done ) =>
    {
        spyOn( http, "get" ).and.returnValue( of( mocks ) );

        service.loadList().subscribe();

        service.collection$.subscribe( collection =>
        {
            expect( collection ).toEqual( mocks );
            done();
        } )
    } );

    it( 'should send post when data not include id', ( done ) =>
    {
        spyOn( http, "post" ).and.returnValue( of( mocks[ 0 ] ) );

        service.save( { ...mocks[ 0 ], id: null } ).subscribe()

        service.collection$.subscribe( collection =>
        {
            expect( collection[ 0 ].id ).toEqual( mocks[ 0 ].id );
            done();
        } )
    } );

    it( 'should handle exception when response is failed', ( done ) =>
    {
        const error = { success: false, type: 'type_missing' };
        spyOn( http, "post" ).and.returnValue( of( error ) );

        service.save( { ...mocks[ 0 ], id: null } ).subscribe( {
            error: ( err: HttpErrorResponse ) =>
            {
                expect( err ).toBeInstanceOf( HttpErrorResponse );
                expect( err.status ).toEqual( 409 );
                done();
            }
        } )
    } );

    it( 'should remove pokemon correctly', ( done ) =>
    {
        spyOn( http, "get" ).and.returnValue( of( mocks ) );
        spyOn( http, "delete" ).and.returnValue( of( null ) );

        service.loadList().pipe(
            mergeMap( () => service.remove( mocks[ 0 ].id! ) ),
            mergeMap( () => service.collection$ )
        ).subscribe( collection =>
        {
            expect( collection.length ).toEqual( 1 );
            expect( collection.some( p => p.id == mocks[ 0 ].id ) ).toBeFalsy();
            done();
        } )
    } );
} );
