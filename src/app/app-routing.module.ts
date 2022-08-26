import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

const APP_ROUTES: Routes = [
    {
        path: '',
        loadChildren: () => import("./features/pokemon/pokemon.module").then( m => m.PokemonModule )
    }
]

@NgModule( {
    imports: [
        RouterModule.forRoot( APP_ROUTES )
    ],
    exports: [
        RouterModule
    ]
} )
export class AppRoutingModule
{
}
