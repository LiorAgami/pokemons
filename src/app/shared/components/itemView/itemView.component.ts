import { Component, OnInit, OnDestroy } from '@angular/core';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

/* Services */
import MainService from '../../../core/services/main.service';
import ToastService  from '../../../core/services/toast.service';
/* Rxjs */
import { Subscription } from 'rxjs';
import { finalize  } from 'rxjs/operators';

@Component({
  selector: 'item-view',
  templateUrl: './itemView.component.html',
  styleUrls: ['./itemView.component.scss']
})
export class ItemViewComponent implements OnInit, OnDestroy {

	private pokViewUpdatedSub: Subscription;

	faTimesCircle = faTimesCircle;
	pokemon;
	pokemonID;

	constructor(
		public mainService: MainService,
		private toastService: ToastService
	) { }

	ngOnInit() {
		const POKEMON_ID = this.mainService.getSelectedPokemonID();

		this.getPokemonData(POKEMON_ID);

		this.pokViewUpdatedSub = this.mainService.pokViewUpdated
			.subscribe(( pokemonID ) => {
				if(pokemonID) this.getPokemonData(pokemonID);
			});
	}

	ngOnDestroy(): void {
		this.pokViewUpdatedSub.unsubscribe();
	}

	getPokemonData(pokemonID) {
		this.mainService.getPokemonData(pokemonID)
			.pipe(
				finalize(() => {
					this.mainService.hideSpinner();
				})
			)
			.subscribe((pokemon) => {
				this.pokemon = pokemon;
				this.pokemonID = pokemonID;
			}, (err) => {
				this.toastService.show('Failed loading pokemon data from API!', { classname: 'bg-danger text-light', delay: 15000 });
			});
	}

	close() {
		this.mainService.clearSelectedPokemonID();
	}
}
