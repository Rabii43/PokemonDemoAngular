import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Pokemon} from "../Model/pokemon";
import {PokemonService} from "../pokemon.service";
import {pictureImage} from "../../../api/entryPoint";

@Component({
  selector: 'app-edit-pokemon',
  templateUrl: './edit-pokemon.component.html',
  styleUrls: ['./edit-pokemon.component.scss']
})
export class EditPokemonComponent implements OnInit {
  pokemon?: Pokemon;
  pokemonId!: string | null;
  ImgUrl: string = pictureImage;

  constructor(private route: ActivatedRoute, private pokemonService: PokemonService) {
  }

  ngOnInit() {
    this.pokemonId = this.route.snapshot.paramMap.get('id');
    console.log(this.pokemonId)
    if (this.pokemonId) {
      this.pokemonService.getPokemonById(+this.pokemonId).subscribe(pokemon => this.pokemon = pokemon);
      // this.pokemon= this.pokemonService.getPokemonById(+this.pokemonId);
    } else {
      this.pokemon = undefined;
    }
  }

}
