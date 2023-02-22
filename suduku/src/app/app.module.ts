import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GridComponent } from './containers/grid/grid.component';
import { BlockComponent } from './components/block/block.component';
import { FormsModule } from '@angular/forms';
import { RemoveZerosPipe } from './utils/remove-zeros.pipe';

@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    BlockComponent,
    RemoveZerosPipe,
    
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
