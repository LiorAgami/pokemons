import { Component, TemplateRef } from '@angular/core';

/* Services */
import ToastService  from '../../../core/services/toast.service';

@Component({
  selector: 'toasts',
  template: `
    <ngb-toast
      *ngFor="let toast of toastService.toasts"
      [class]="toast.classname"
      [autohide]="true"
      [delay]="toast.delay || 5000"
      (hidden)="toastService.remove(toast)"
    >
      <ng-template [ngIf]="isTemplate(toast)" [ngIfElse]="text">
        <ng-template [ngTemplateOutlet]="toast.textOrTpl"></ng-template>
      </ng-template>

      <ng-template #text>{{ toast.textOrTpl }}</ng-template>
    </ngb-toast>
  `,
  host: {'[class.ngb-toasts]': 'true'}
})
export class ToastsContainer {
  constructor( public toastService: ToastService ) { }

  isTemplate(toast) {
	  return toast.textOrTpl instanceof TemplateRef;
	}
}
