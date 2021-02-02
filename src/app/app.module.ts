import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from "ngx-spinner";

/* Componenets */
import { AppComponent } from './app.component';
import { ItemViewComponent } from '../app/shared/components/itemView/itemView.component';
import { ListComponent } from '../app/shared/components/list/list.component';
import { ToastsContainer } from '../app/shared/components/toast/toasts-container.component';

@NgModule({
	declarations: [
		AppComponent,
		ItemViewComponent,
		ListComponent,
		ToastsContainer
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		NgbModule,
		FontAwesomeModule,
		NgxSpinnerModule,
		BrowserAnimationsModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
