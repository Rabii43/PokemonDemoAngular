import {Component, OnInit} from '@angular/core';
import {Pokemon} from "../Model/pokemon";
import {ActivatedRoute, Router} from "@angular/router";
import {PokemonService} from "../pokemon.service";
import {pictureImage} from "../../../api/entryPoint";

@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.component.html',
  styleUrls: ['./detail-pokemon.component.scss']
})
export class DetailPokemonComponent implements OnInit {

  pokemonList!: Pokemon[];
  pokemon!: Pokemon | undefined;
  urlImag: string = pictureImage;
  constructor(private route: ActivatedRoute, private router: Router, private pokemonService: PokemonService) {
  }

  ngOnInit(): void {
    this.pokemonService.getPokemonList().subscribe(pokemonList => this.pokemonList = pokemonList); //async data
    // this.pokemonList= this.pokemonService.getPokemonList(); //async data
    const pokemonId: string | number | null = this.route.snapshot.paramMap.get('id');
    if (pokemonId) {
      // this.pokemon = this.pokemonService.getPokemonById(+pokemonId); //syncrone data
      this.pokemonService.getPokemonById(+pokemonId).subscribe(pokemon => this.pokemon = pokemon);  //async data

      // this.pokemon = this.pokemonList.find(pokemon=>pokemon.id == +pokemonId);
    }
  }

  goBack() {
    this.router.navigate(['/pokemons']);
  }

  editPokemon(pokemon: Pokemon) {
    this.router.navigate(['/edit/pokemon', pokemon.id]);
  }

  deletePokemon(pokemon: Pokemon) {
    this.pokemonService.deletePokemon(pokemon.id).subscribe(()=>this.goBack())
  }
}
