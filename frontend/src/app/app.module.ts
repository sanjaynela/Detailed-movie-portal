import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MyListComponent } from './pages/my-list/my-list.component';

import { HttpClientModule} from '@angular/common/http';
import { CarouselBasicComponent } from './components/carousel-basic/carousel-basic.component';
import { CarouselGridComponent } from './components/carousel-grid/carousel-grid.component';
import { CarouselGridShowComponent } from './components/carousel-grid-show/carousel-grid-show.component';
import { DetailsPageComponent } from './pages/details-page/details-page.component';
import { WatchPageComponent } from './pages/watch-page/watch-page.component';

import { YouTubePlayerModule } from '@angular/youtube-player';
import { ModalConfigComponent } from './components/modal-config/modal-config.component';
import { ShowDetailsPageComponent } from './pages/show-details-page/show-details-page.component';
import { CarouselGridMsComponentComponent } from './components/carousel-grid-ms-component/carousel-grid-ms-component.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    FooterComponent,
    NavbarComponent,
    MyListComponent,
    CarouselBasicComponent,
    CarouselGridComponent,
    CarouselGridShowComponent,
    DetailsPageComponent,
    WatchPageComponent,
    ModalConfigComponent,
    ShowDetailsPageComponent,
    CarouselGridMsComponentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    YouTubePlayerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
