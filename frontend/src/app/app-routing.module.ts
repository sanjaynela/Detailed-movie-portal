import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MyListComponent } from './pages/my-list/my-list.component';
import { DetailsPageComponent } from './pages/details-page/details-page.component';
import { WatchPageComponent } from './pages/watch-page/watch-page.component'
import { ShowDetailsPageComponent } from './pages/show-details-page/show-details-page.component';



const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'myList', component:MyListComponent},
  {path: 'watch',
    children: [
      { path: 'tv',
        children: [
          {path:':id',component: ShowDetailsPageComponent}
        ]},
        { path: 'movie',
        children: [
          {path:':id',component: DetailsPageComponent}
        ]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
