import { Injectable } from '@angular/core';

/* Rxjs */
import { Subject } from 'rxjs';
/* Services */
import { HttpService } from './http.service';
/* Models */
import { PokemonsEntries } from '../../shared/models/PokemonsEntries.model';
import { PokemonData } from '../../shared/models/PokemonData.model';

@Injectable({
  providedIn: 'root'
})
export default class MainService {

	poksListUpdated = new Subject<any>();
	pokViewUpdated = new Subject<any>();
	spinnerToggled = new Subject<any>();

	private pokemons: PokemonsEntries[];
	private selectedPokemonID = null;

	constructor( private httpService: HttpService ) { }


	getPokemonsList(limit = 20) {
		return this.httpService.fetchPokemons(limit);
	}

	getPokemonData(id) {
		return this.httpService.fetchPokemonData(id);
	}

	getPokemons() {
		return [...this.pokemons];
	}

	setPokemons(data) {
		this.pokemons = data;
		this.poksListUpdated.next([...data]);
	}

	getSelectedPokemonID() {
		return this.selectedPokemonID;
	}

	setSelectedPokemonID(id) {
		this.selectedPokemonID = id;
		this.pokViewUpdated.next(id);
	}

	clearSelectedPokemonID() {
		this.selectedPokemonID = null;
		this.pokViewUpdated.next(null);

	}

	showSpinner() {
		this.spinnerToggled.next(true);
	}

	hideSpinner() {
		this.spinnerToggled.next(false);
	}
}
