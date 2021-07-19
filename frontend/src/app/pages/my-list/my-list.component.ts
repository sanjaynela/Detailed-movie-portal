import { Component, OnInit} from '@angular/core';
import { ShowsService } from 'src/app/services/shows.service';

import { MoviesService } from '../../services/movies.service';

// import { Alert } from

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.css']
})
export class MyListComponent implements OnInit {
  myList:string[];
  posterList:string[];
  // @Output() closed:EventEmitter<Alert> = new EventEmitter();

  constructor(private moviesService : MoviesService,private showsService:ShowsService) {
    this.myList = [];
    this.posterList = [];
   }

  ngOnInit(): void {
    this.retrieveMyList();
    this.retrievePosters();
    this.retrievePostersForShows();
  }

  retrieveMyList(){
    let mySavedList = localStorage.getItem("myList");
    if(mySavedList!=null){
      this.myList = JSON.parse(mySavedList);
    }
  }

  retrievePosters(){
    if(this.myList.length!=0){
      this.myList.forEach((movieId) =>{
        this.moviesService.getMovieDetails(movieId).subscribe(
          res => {
            if(!this.posterList.includes(res.poster_path)){
              this.posterList.push(res.poster_path);
            }
          }
        );
      });
    }
  }

  retrievePostersForShows(){
    if(this.myList.length!=0){
      this.myList.forEach((showId) =>{
        this.showsService.getShowDetails(showId).subscribe(
          res => {
            if(!this.posterList.includes(res.poster_path)){
              this.posterList.push(res.poster_path);
            }
          }
        );
      });
    }
  }

}
