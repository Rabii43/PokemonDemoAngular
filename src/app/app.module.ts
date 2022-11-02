import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {PokemonModule} from "./pokemon/pokemon.module";
import {FormsModule} from "@angular/forms";
import { HttpClientModule , HTTP_INTERCEPTORS  } from '@angular/common/http';
import {AuthModule} from "./auth/auth.module";
import {AuthInterceptor} from "./auth/helpers/auth.interceptor";
// import {HttpClientInMemoryWebApiModule} from "angular-in-memory-web-api";
// import {InMemoryDataService} from "./in-memory-data.service";





@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    // HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {dataEncapsulation:false}),
    AuthModule,
    PokemonModule,
    AppRoutingModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
