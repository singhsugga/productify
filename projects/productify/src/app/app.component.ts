import { Component } from '@angular/core';
import { ProDialogService } from 'projects/productify-ui/src/public-api';

import { DialogComponent } from './demo/dialog/dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'productify';
  constructor(private dialog:ProDialogService){

  }

  openDialog(){
    const ref =this.dialog.open(DialogComponent,{
      data:{},
      background:'BLACK',
      position:'CENTER'
    })
  }
}
