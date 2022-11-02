import {Component, OnInit} from '@angular/core';

import {Pokemon} from "../Model/pokemon";
import {POKEMONS} from "../Model/mock-pokemons";
import {Router} from "@angular/router";
import {PokemonService} from "../pokemon.service";
import {pictureImage} from "../../../api/entryPoint";


@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',
  styleUrls: ['./list-pokemon.component.scss']
})
export class ListPokemonComponent implements OnInit {

  pokemons!: Pokemon[];
  urlImag: string = pictureImage;

  constructor(
    private router: Router,
    private pokemonService: PokemonService,
  ) {
  }

  ngOnInit(): void {
    this.pokemonService.getPokemonList().subscribe(pokemonList => {
      this.pokemons! = pokemonList;
      console.log()
    });
    // this.pokemons= this.pokemonService.getPokemonList();
    this.pokemonService.getPokemonTypeList();
  }

  selectPokemon(pokemon: Pokemon) {
    this.router.navigate(['/pokemon', pokemon.id]);
  }

  findPokemon() {

  }
}
