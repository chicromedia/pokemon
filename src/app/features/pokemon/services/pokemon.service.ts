import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { IPokemon } from "../interfaces/pokemon";
import { BehaviorSubject, tap } from "rxjs";

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
}
