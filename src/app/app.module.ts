import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AddGameComponent } from './add-game/add-game.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PriceRangeSliderComponent } from './price-range-slider/price-range-slider.component';
import { AuthService } from './auth.service';
import { GameService } from './game.service';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AddGameComponent,
    PriceRangeSliderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthService,GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
