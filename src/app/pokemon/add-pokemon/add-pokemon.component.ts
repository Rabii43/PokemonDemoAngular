import {Component, OnInit} from '@angular/core';
import {Pokemon} from "../Model/pokemon";
import {PokemonService} from "../pokemon.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-add-pokemon',
  templateUrl: './add-pokemon.component.html',
  styleUrls: ['./add-pokemon.component.scss']
})
export class AddPokemonComponent implements OnInit {
  pokemon!: Pokemon

  constructor(
    private pokemonServices: PokemonService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.pokemon= new Pokemon();
  }

}
