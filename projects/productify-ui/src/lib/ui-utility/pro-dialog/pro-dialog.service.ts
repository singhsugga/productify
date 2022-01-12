import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, Type, EmbeddedViewRef, ComponentRef } from '@angular/core';
import { ProDialogConfig } from './pro-dialog.config';
import { ProDialogInjector } from './pro-dialog.injector';
import { ProDialogRef } from './pro-dialog.ref';
import { ProDialogComponent } from './pro-dialog/pro-dialog.component';

// import { UiDialogConfig } from './ui-dialog-config';
// import { UiDialogInjector } from './ui-dialog-injector';
// import { UiDialogRef } from './ui-dialog-ref';
// import { UiDialogComponent } from './ui-dialog.component';
// import { UiDialogModule } from './ui-dialog.module';


@Injectable({
    providedIn: 'root',
})
export class ProDialogService {
    dialogComponentRef: ComponentRef<ProDialogComponent>[] = [];
    constructor(private componentFactoryResolver: ComponentFactoryResolver, private appRef: ApplicationRef, private injector: Injector) { }

    public open(componentType: Type<any>, config: ProDialogConfig) {
        const dialogRef = this.appendDialogComponentToBody(config);
        this.dialogComponentRef[this.dialogComponentRef?.length - 1].instance.childComponentType = componentType;
        return dialogRef
    }

    private appendDialogComponentToBody(config: ProDialogConfig) {
        const map = new WeakMap();
        map.set(ProDialogConfig, config);

        const dialogRef = new ProDialogRef();
        map.set(ProDialogRef, dialogRef);

        const sub = dialogRef.afterClosed.subscribe(() => {
            this.removeDialogComponentFromBody();
            sub.unsubscribe();
        });

        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ProDialogComponent);
        const componentRef = componentFactory.create(new ProDialogInjector(this.injector, map));

        this.appRef.attachView(componentRef.hostView);



        const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
        document.body.appendChild(domElem);

        this.dialogComponentRef.push(componentRef)
        this.dialogComponentRef[this.dialogComponentRef?.length - 1].instance.onClose.subscribe(() => {
            this.removeDialogComponentFromBody();
        });

        return dialogRef;
    }

    private removeDialogComponentFromBody() {
        this.appRef.detachView(this.dialogComponentRef[this.dialogComponentRef?.length - 1].hostView);
        this.dialogComponentRef.pop()?.destroy();
        console.log("dialog refs", this.dialogComponentRef)

    }

}
