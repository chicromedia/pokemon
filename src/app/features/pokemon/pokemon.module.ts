import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "../../shared/shared.module";
import { PokemonComponent } from "./pokemon.component";
import { PokemonFormComponent } from "./components/pokemon-form/pokemon-form.component";
import { PokemonHeaderComponent } from "./components/pokemon-header/pokemon-header.component";
import { RouterModule, Routes } from "@angular/router";


const POKEMON_ROUTES: Routes = [
    {
        path: '',
        component: PokemonComponent
    }
]

@NgModule( {
    imports: [
        CommonModule,
        RouterModule.forChild( POKEMON_ROUTES ),
        SharedModule
    ],
    declarations: [
        PokemonComponent,
        PokemonFormComponent,
        PokemonHeaderComponent
    ]
} )
export class PokemonModule
{
}
