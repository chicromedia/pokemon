import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { IPokemon } from "../interfaces/pokemon";
import { BehaviorSubject, map, tap } from "rxjs";

@Injectable( {
    providedIn: 'root'
} )
export class PokemonService
{
    private readonly API_BASE: string = 'https://bp-pokemons.herokuapp.com/';
    private readonly _collection: BehaviorSubject<IPokemon[]> = new BehaviorSubject<IPokemon[]>( [] );

    constructor( private http: HttpClient )
    {
    }

    get collection$()
    {
        return this._collection.asObservable();
    }

    loadList( idAuthor: number = 1 )
    {
        const params = new HttpParams( { fromObject: { idAuthor } } )
        return this.http.get<IPokemon[]>( this.API_BASE, { params } ).pipe(
            tap( collection => this._collection.next( collection ) )
        )
    }

    save( data: IPokemon, idAuthor: number = 1 )
    {
        const request$ = !!data.id
            ? this.http.put<IPokemon>( `${ this.API_BASE }${ data.id }`, data )
            : this.http.post<IPokemon>( this.API_BASE, data, { params: new HttpParams( { fromObject: { idAuthor } } ) } )

        return request$.pipe(
            map( ( response: IPokemon ) =>
            {
                if ( !response.id )
                {
                    throw new HttpErrorResponse( { error: response, status: 409 } )
                }
                return response;
            } ),
            tap( ( pokemon: IPokemon ) =>
            {
                const collection = this._collection.getValue();
                this._collection.next(
                    collection.some( p => p.id == pokemon.id )
                        ? collection.map( p => p.id == pokemon.id ? pokemon : p )
                        : collection.concat( pokemon )
                );
            } ) )
    }

    remove( id?: number )
    {
        return this.http.delete<IPokemon>( `${ this.API_BASE }${ id }` ).pipe( tap( () =>
        {
            const collection = this._collection.getValue();
            this._collection.next( collection.filter( p => p.id !== id ) )
        } ) );
    }
}
