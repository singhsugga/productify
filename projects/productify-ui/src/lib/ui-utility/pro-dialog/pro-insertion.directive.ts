import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[proInsertion]',
})
export class ProInsertionDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
