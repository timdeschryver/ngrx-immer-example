import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatListModule, MatBadgeModule } from '@angular/material';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

import { AppComponent } from './app.component';
import { CatalogState } from './state/catalog';
import { CartState } from './state/cart';

const MATERIAL_COMPONENTS = [MatButtonModule, MatCardModule, MatListModule, MatBadgeModule];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    ...MATERIAL_COMPONENTS,
    NgxsModule.forRoot([CatalogState, CartState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
