import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { ShowsService } from '../../services/shows.service';

import { Movie } from '../../models/Movie';
import { Show } from '../../models/Show';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  currentPlayingMovies:Movie[];
  popularMovies:Movie[];
  topRatedMovies:Movie[];
  trendingMovies:Movie[];
  popularShows:Show[];
  topRatedShows:Show[];
  trendingShows:Show[];
  inContinueListStatus:boolean;
  continueList:string[];
  continueShowList:string[];
  posterList:string[];
  continueWatchingList:any[];


  constructor(private moviesService : MoviesService, private showsService : ShowsService) {
    this.currentPlayingMovies = [];
    this.popularMovies = [];
    this.topRatedMovies = [];
    this.trendingMovies = [];
    this.popularShows = [];
    this.topRatedShows = [];
    this.trendingShows = [];
    this.inContinueListStatus = false;
    this.continueList = [];
    this.continueShowList = [];
    this.posterList = [];
    this.continueWatchingList = [];
  }

  ngOnInit(): void {
    this.fetchCurrentlyPlayingMovies();
    this.fetchPopularMovies();
    this.fetchTopRatedMovies();
    this.fetchTrendingMovies();
    this.fetchPopularShows();
    this.fetchTopRatedShows();
    this.fetchTrendingShows();
    this.retrieveContinueList();
    this.AddMoviestoContinueWatchingList();
    this.AddShowstoContinueWatchingList();
  }

  //Movies

  fetchCurrentlyPlayingMovies(){
    this.moviesService.getCurrentlyPlayingMovies().subscribe(
      res => {
        this.currentPlayingMovies = res;
      }
    );
  }

  fetchPopularMovies(){
    this.moviesService.getPopularMovies().subscribe(
      res => {
        this.popularMovies = res;
      }
    );
  }

  fetchTopRatedMovies(){
    this.moviesService.getTopRatedMovies().subscribe(
      res => {
        this.topRatedMovies = res;
      }
    );
  }

  fetchTrendingMovies(){
    this.moviesService.getTrendingMovies().subscribe(
      res => {
        this.trendingMovies = res;
      }
    );
  }

  //Shows

  fetchPopularShows(){
    this.showsService.getPopularShows().subscribe(
      res => {
        this.popularShows = res;
      }
    );
  }

  fetchTopRatedShows(){
    this.showsService.getTopRatedShows().subscribe(
      res => {
        this.topRatedShows = res;
      }
    );
  }

  fetchTrendingShows(){
    this.showsService.getTrendingShows().subscribe(
      res => {
        this.trendingShows = res;
      }
    );
  }

  //Checks if continueList contains specified movieId
  retrieveContinueList(){
    let continueListString = localStorage.getItem('continueList');
    if(continueListString!=null){
      this.continueList = JSON.parse(continueListString);
    }
  }

  //Checks if continueList contains specified showList
  retrieveContinueShowList(){
    let continueListString = localStorage.getItem('continueShowList');
    if(continueListString!=null){
      this.continueShowList = JSON.parse(continueListString);
    }
  }



  //Push results from movie list into continue watching list
  AddMoviestoContinueWatchingList(){
    this.continueList.forEach(movieId =>{
      this.moviesService.getMovieDetails(movieId).subscribe(
        res => {
          this.continueWatchingList.push(res);
        }
      )
    });
  }

  //Push results from show list into continue watching list
  AddShowstoContinueWatchingList(){
    this.continueShowList.forEach(showId =>{
      this.showsService.getShowDetails(showId).subscribe(
        res => {
          this.continueWatchingList.push(res);
        }
      )
    });
  }

  // addToContinueList(movieId:string){
  //   let continueList = localStorage.getItem('continueList');
  //   if(continueList!=null){
  //     let myContinueList = JSON.parse(continueList);
  //     if(!myContinueList.includes(movieId)){
  //         myContinueList.push(movieId);
  //         localStorage.setItem('continueList',JSON.stringify(myContinueList));
  //     }
  //   }
  //   else{
  //     let myContinueList = [];
  //     myContinueList.push(movieId);
  //     localStorage.setItem('continueList',JSON.stringify(myContinueList));
  //   }
  //   this.inContinueListStatus = true;
  // }

  // retrievePosters(){
  //   if(this.continueList.length!=0){
  //     this.continueList.forEach((movieId) =>{
  //       this.moviesService.getMovieDetails(movieId).subscribe(
  //         res => {
  //           if(!this.posterList.includes(res.poster_path)){
  //             this.posterList.push(res.poster_path);
  //           }
  //         }
  //       );
  //     });
  //   }
  // }

}
