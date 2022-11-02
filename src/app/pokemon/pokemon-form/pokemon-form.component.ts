import {Component, Input, OnInit} from '@angular/core';
import {PokemonService} from "../pokemon.service";
import {Pokemon} from "../Model/pokemon";
import {Router} from "@angular/router";

@Component({
  selector: 'app-pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['./pokemon-form.component.scss']
})
export class PokemonFormComponent implements OnInit {
  types?: string[];
  @Input() pokemon?: Pokemon;

  constructor(
    private pokemonService: PokemonService,
    private router: Router
  ) {
  }

  ngOnInit() {
    //pokemon list types
    this.types = this.pokemonService.getPokemonTypeList();
    console.log(this.types)
    // verification url include pokemon/add
    this.verif();
  }

  hasType(type: string): boolean | undefined {
    return this.pokemon?.types.includes(type);
  }

  selectType($event: Event, type: string) {
    const isChecked = ($event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.pokemon?.types.push(type);
    } else {
      const index = this.pokemon!.types.indexOf(type);
      this.pokemon?.types.splice(index, 1);
    }
  }

  onSubmit() {
    console.log('submit form');
    if (this.verif()) {
      this.pokemonService.addPokemon(this.pokemon!).subscribe((pokemon => {
        this.router.navigate(['/pokemon', pokemon.id]);
        console.log(pokemon)
      }))
    } else {
      this.pokemonService.updatePokemon(this.pokemon!).subscribe(() => {
        if (this.pokemon) {
          this.router.navigate(['/pokemon', this.pokemon.id])
        }
      })
    }
  }

  isTypesValid(type: string) {
    if (this.pokemon!.types.length == 1 && this.hasType(type)) {
      return false;
    }
    if (this.pokemon!.types.length > 2 && !this.hasType(type)) {
      return false;
    }
    return true;
  }

  verif() {
    return this.router.url.includes('pokemon/add');
  }
}
