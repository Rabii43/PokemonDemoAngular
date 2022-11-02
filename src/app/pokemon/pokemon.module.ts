import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListPokemonComponent} from "./list-pokemon/list-pokemon.component";
import {PkmnBorderCardDirective} from "./pkmn-border-card.directive";
import {PokemonTypeColorPipe} from "./pokemon-type-color.pipe";
import {DetailPokemonComponent} from "./detail-pokemon/detail-pokemon.component";
import {PageNotFoundComponent} from "../page-not-found/page-not-found.component";
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {PokemonFormComponent} from './pokemon-form/pokemon-form.component';
import {EditPokemonComponent} from "./edit-pokemon/edit-pokemon.component";
import {AddPokemonComponent} from './add-pokemon/add-pokemon.component';
import {SearchPokemonComponent} from './search-pokemon/search-pokemon.component';
import {LoaderComponent} from './loader/loader.component';
import {AuthGuard} from "../auth/helpers/auth.guard";

const pokemonRoutes: Routes = [
  {path: 'pokemon/add', component: AddPokemonComponent, canActivate: [AuthGuard]},
  {path: 'edit/pokemon/:id', component: EditPokemonComponent, canActivate: [AuthGuard]},
  {path: 'pokemons', component: ListPokemonComponent, canActivate: [AuthGuard]},
  {path: 'pokemon/:id', component: DetailPokemonComponent, canActivate: [AuthGuard]},
]

@NgModule({
  declarations: [
    EditPokemonComponent,
    PkmnBorderCardDirective,
    PokemonTypeColorPipe,
    DetailPokemonComponent,
    ListPokemonComponent,
    PageNotFoundComponent,
    PokemonFormComponent,
    AddPokemonComponent,
    SearchPokemonComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(pokemonRoutes)
  ]
})
export class PokemonModule {
}
