import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatToolbarModule, MatIconModule, MatCardModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, //routes
    BrowserAnimationsModule,
    
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
