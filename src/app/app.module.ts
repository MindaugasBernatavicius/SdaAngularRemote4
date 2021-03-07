import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import {FormsModule} from '@angular/forms';
import { ProductsComponent } from './components/products/products.component';
import { ConverttospacePipe } from './pipes/converttospace.pipe';
import { HomeComponent } from './components/home/home.component';
import { StarComponent } from './components/star/star.component';
import { RouterModule } from '@angular/router';
import { AboutComponent } from './components/about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProductsComponent,
    ConverttospacePipe,
    HomeComponent,
    StarComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'about', component: AboutComponent },
      { path: 'home', component: HomeComponent },
      { path: 'products', component: ProductsComponent },
      { path: '**', redirectTo: 'home', pathMatch: 'full' },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
