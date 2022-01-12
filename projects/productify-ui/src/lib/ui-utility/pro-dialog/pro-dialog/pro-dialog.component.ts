import {
  Component,
  Type,
  ComponentFactoryResolver,
  ViewChild,
  OnDestroy,
  ComponentRef,
  AfterViewInit,
  ChangeDetectorRef,
  OnInit,
} from '@angular/core';

import { Subject } from 'rxjs';

import {
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';
import { ProDialogConfig } from '../pro-dialog.config';
import { ProDialogRef } from '../pro-dialog.ref';
import { ProInsertionDirective } from '../pro-insertion.directive';

@Component({
  selector: 'pro-dialog',
  templateUrl: './pro-dialog.component.html',
  styleUrls: ['./pro-dialog.component.css'],
})
export class ProDialogComponent implements AfterViewInit, OnDestroy, OnInit {
  componentRef!: ComponentRef<any>;
  position!: 'TOP' | 'BOTTOM' | 'RIGHT' | 'LEFT' | 'CENTER'
  background!: 'BLACK' | 'TRANSPARENT'
  closeOnOverlay!: boolean;
  @ViewChild(ProInsertionDirective, { static: true })
  insertionPoint!: ProInsertionDirective;
  animation = true;

  private readonly onDialogClose = new Subject<any>();
  public onClose = this.onDialogClose.asObservable();

  childComponentType!: Type<any>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private cd: ChangeDetectorRef,
    private dialogRef: ProDialogRef,
    public config: ProDialogConfig,
    private router: Router
  ) { }
  ngOnInit() {
    this.position = this.config.position ?? 'CENTER';
    this.background = this.config.background ?? 'BLACK';
    this.closeOnOverlay = this.config.closeOnOverlayClick ?? true;
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      this.animation = false;
    }, 200);
    this.routeAction();
  }

  routeAction() {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        // Show loading indicator
      }
      if (event instanceof NavigationEnd) {
        // Hide loading indicator
        this.dialogRef.close();
      }
      if (event instanceof NavigationError) {
        // Hide loading indicator
        // Present error to user
      }
    });
  }
  ngAfterViewInit() {
    this.loadChildComponent(this.childComponentType);
    this.cd.detectChanges();
  }

  onOverlayClicked(evt: MouseEvent) {

    if (this.closeOnOverlay) {
      this.dialogRef.close();
    }

  }

  onDialogClicked(evt: MouseEvent) {
    evt.stopPropagation();
  }

  loadChildComponent(componentType: Type<any>) {
    const componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(componentType);

    const viewContainerRef = this.insertionPoint.viewContainerRef;
    viewContainerRef.clear();

    this.componentRef = viewContainerRef.createComponent(componentFactory);
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  close() {
    this.onDialogClose.next(true);
    document.body.style.overflow = 'auto';
  }
}
