import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ProDialogModule } from '@productify/ui';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DialogComponent } from './demo/dialog/dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
