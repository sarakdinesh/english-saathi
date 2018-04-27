import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ImgCardComponent } from './img-card/img-card.component';
import { MatToolbarModule, MatCardModule } from '@angular/material';
@NgModule({
  declarations: [AppComponent,ImgCardComponent],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent,ImgCardComponent]
})
export class AppModule { }