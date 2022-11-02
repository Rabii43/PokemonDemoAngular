import {Component, OnInit} from '@angular/core';
import {PokemonService} from "../pokemon.service";
import {Pokemon} from "../Model/pokemon";
import {Router} from "@angular/router";
import {debounceTime, distinctUntilChanged, Observable, Subject, switchMap} from "rxjs";

@Component({
  selector: 'app-search-pokemon',
  templateUrl: './search-pokemon.component.html',
  styleUrls: ['./search-pokemon.component.scss']
})
export class SearchPokemonComponent implements OnInit {
  searchTerms = new Subject<string>();
  pokemons$!: Observable<Pokemon[]>;

  constructor(
    private pokemonService: PokemonService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.pokemons$ = this.searchTerms.pipe(
      // {...."a"."ab"."abz"..."ab".."abc"......}
      debounceTime(300),
      // {...."ab"..."ab".."abc"...}
      distinctUntilChanged(),
      // {..."ab".."abc"...}
      switchMap((term) => this.pokemonService.searchPokemon(term))
    )
  }

  search(term: string) {
    this.searchTerms.next(term);
  }

  goToDetail(pokemon: Pokemon) {
    const link = ['pokemon', pokemon.id]
    this.router.navigate(link);
  }
}
