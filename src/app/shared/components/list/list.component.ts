import { Component, OnInit, OnDestroy } from '@angular/core';

/* Services */
import MainService from '../../../core/services/main.service';
/* Rxjs */
import { Subscription } from 'rxjs';


@Component({
  selector: 'items-list',
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit, OnDestroy {

	private pokUpdatedSub: Subscription;

	page = 1;
	pageSize = 8;
	pokemons;
	collectionSize;

  	constructor( private mainService: MainService ) { }

	ngOnInit() {
		this.pokUpdatedSub = this.mainService.poksListUpdated
			.subscribe((res) => {
				this.pokemons = res;
				this.collectionSize = this.pokemons.length;
				this.refreshPokemons();
			});
	}

	ngOnDestroy(): void {
		this.pokUpdatedSub.unsubscribe();
	}

	refreshPokemons() {
		this.pokemons = this.mainService.getPokemons()
			.map((pokemon, i) => ({id: i + 1, ...pokemon}))
			.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
	}

	getIdFromIndex(index) {
		return (index + 1) + (this.page > 1 ? ((this.pageSize * this.page) - this.pageSize) : 0);
	}

	setSelectedPokemonID(index) {
		this.mainService.setSelectedPokemonID(this.getIdFromIndex(index));
		this.mainService.showSpinner();
	}
}
