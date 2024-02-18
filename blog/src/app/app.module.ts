import { AppComponent } from './app.component';
import { AppMaterialModule } from './app-material/app-material.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgrxOperatorsComponent } from './posts/ngrx-operators/ngrx-operators.component';
import { CardComponent } from './components/card/card.component';
import { AsyncComponent } from './posts/async/async.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [AppComponent, NgrxOperatorsComponent, CardComponent, AsyncComponent],
  imports: [
    AppMaterialModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTooltipModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
