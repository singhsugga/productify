import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProDialogComponent } from './pro-dialog/pro-dialog.component';
import { ProInsertionDirective } from './pro-insertion.directive';



@NgModule({
  declarations: [
    ProDialogComponent, ProInsertionDirective
  ],
  imports: [
    CommonModule
  ]
})
export class ProDialogModule { }
