import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";

/* Services */
import MainService from './core/services/main.service';
import ToastService  from './core/services/toast.service';
/* Models */
import { ResultQuery } from './shared/models/ResultQuery.model';
/* Rxjs */
import { Subscription } from 'rxjs';
import { finalize  } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

	private spinnerToggledSub: Subscription;
	private pokViewUpdatedSub: Subscription;
	showSpinner = false;
	pokemonID = null;

	constructor(
		public mainService: MainService,
		private spinner: NgxSpinnerService,
		public toastService: ToastService
	) {}

	ngOnInit() {
		this.spinner.show();

		this.mainService.getPokemonsList(50)
			.pipe(
				finalize(() => {
					this.spinner.hide();
				})
			)
			.subscribe(
				(data: ResultQuery) => this.mainService.setPokemons(data?.results),
				(err) => {
					this.toastService.show(
						'Failed loading pokemons from API!',
						{ classname: 'bg-danger text-light', delay: 15000 }
					)
				}
			);

		this.spinnerToggledSub = this.mainService.spinnerToggled
			.subscribe((show) => {
				this.spinner[show ? 'show' : 'hide']();
			});

		this.pokViewUpdatedSub = this.mainService.pokViewUpdated
			.subscribe((pokemonID) => {
				this.pokemonID = pokemonID;
			});

	}

	ngOnDestroy() {
		this.spinnerToggledSub.unsubscribe();
		this.pokViewUpdatedSub.unsubscribe();
	}
}
