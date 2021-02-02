
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

	constructor( private http: HttpClient ) {}

	fetchPokemons(limit) {
		return this.http.get(`${environment.POKEMON_API_URL}/pokemon?limit=${limit}`);
	}

	fetchPokemonData(id = 1) {
		return this.http.get(`${environment.POKEMON_API_URL}/pokemon/${id}/`);
	}

}
