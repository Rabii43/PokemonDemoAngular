import {Injectable} from '@angular/core';
import {Pokemon} from "./Model/pokemon";
import {POKEMONS} from "./Model/mock-pokemons";

import {Observable, of, pipe} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {pokemonAdd, pokemonIds, pokemonsList} from "../../api/entryPoint";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  constructor(private http: HttpClient) {
  }

  pokemons?: Pokemon[] = [];
  typeList: string[] = [];
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  // headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*').set('X-Requested-With', 'XMLHttpRequest').set('Content-Type', 'application/json');
  getPokemonList(): Observable<Pokemon[]> {
    // return POKEMONS;

    return this.http.get<Pokemon[]>(pokemonsList, {headers: this.headers}).pipe(
      tap((pokemons) => pokemons[0]),
      catchError((err) => this.handleError(err, [])
        // {console.log(err);
        //   return of([]);}
      )
    )
  }

  // getPokemonList(): Pokemon[] {
  //   return POKEMONS;
  // }
  getPokemonById(pokemonId: number | undefined): Observable<Pokemon | undefined> {
    // return POKEMONS.find(pokemon => pokemon.id == pokemonId);
    return this.http.get<Pokemon>(pokemonIds+`${pokemonId}`,{headers: this.headers}).pipe(
      tap((pokemon) => this.log(pokemon)),
      catchError((err) => this.handleError(err, null)
        // {console.log(err);
        //   return of(undefined);}
      )
    )
  }

  searchPokemon(term: string): Observable<Pokemon[]> {
    if (term.length <= 1) {
      return of([]);
    }
    return this.http.get<Pokemon[]>(pokemonsList +`/?name=${term}`).pipe(
      tap((listPokemon) => {
        this.log(listPokemon);
      }), catchError(err => this.handleError(err, []))
    );
  }

  updatePokemon(pokemon: Pokemon): Observable<Pokemon | null> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.put(pokemonIds+`${pokemon.id}`, pokemon, httpOptions).pipe(
      tap(response => this.log(response)),
      catchError(
        (err) => this.handleError(err, null))
    );
  }

  // getPokemonById(pokemonId: number | undefined): Pokemon | undefined {
  //   return POKEMONS.find(pokemon => pokemon.id == pokemonId);
  // }

  // getPokemonTypeList(): Observable<string[]> {
  //   let pokList: string;
  //   // return this.typeList = [...new Set(this.typeList)];
  //   return this.http.get<string[]>('api/pokemons/').pipe(
  //     tap(() => {
  //       this.pokemons.map((pokemon) => pokemon.types.map((type) => {
  //           pokList = type.valueOf();
  //           this.typeList.push(pokList);
  //         })
  //       );
  //       this.typeList=[...new Set(this.typeList)]
  //     })
  //   )
  // }
  getPokemonTypeList(): string[] {
    let pokList: string;
    this.getPokemonList().subscribe((pokemonList) => {
      return pokemonList.map((pokemon) => pokemon.types.map((type) => {
        pokList = type.valueOf();
        //no duplicated value type
        if (!this.typeList.includes(pokList))
          this.typeList.push(pokList);
      }));
    })
    return this.typeList;
  }

  private log(response: any) {
    console.table(response);
  }

  private handleError(error: Error, errorValue: any) {
    console.log(error);
    return of(errorValue);
  }

  deletePokemon(pokemonId: number): Observable<Pokemon | null> {
    return this.http.delete(pokemonIds+`${+pokemonId}`).pipe(
      tap((res) => this.log(res)),
      catchError((err) => this.handleError(err, null))
    );
  }

  addPokemon(pokemon: Pokemon): Observable<Pokemon> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    console.log(pokemon, 'pokemon');
    return this.http.post<Pokemon>(pokemonAdd, pokemon, httpOptions).pipe(
      tap((res) => this.log(res)),
      catchError(err => this.handleError(err, null))
    );
  }

}

