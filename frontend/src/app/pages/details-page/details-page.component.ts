import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MoviesService } from '../../services/movies.service';

import { MovieDetails } from '../../models/MovieDetails';
import { Video } from 'src/app/models/Video';
import { CastDetails } from 'src/app/models/CastDetails';

import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Review } from 'src/app/models/Review';
import { Movie } from 'src/app/models/Movie';

// @Component({
//   selector: 'ngbd-modal-content',
//   template: `
//     <div class="modal-header">
//       <h4 class="modal-title">Hi there!</h4>
//       <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
//         <span aria-hidden="true">&times;</span>
//       </button>
//     </div>
//     <div class="modal-body">
//       <p>Hello, {{name}}!</p>
//     </div>
//     <div class="modal-footer">
//       <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
//     </div>
//   `
// })
// export class NgbdModalContent {
//   @Input() name;

//   constructor(public activeModal: NgbActiveModal) {
//     this.name = "";
//   }
// }

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css']
})
export class DetailsPageComponent implements OnInit {
  id:string;
  movieDetails:MovieDetails;
  videoObj:Video;
  inListStatus:boolean;
  removeStatus:boolean;
  addStatus:boolean;
  castDetailsList:CastDetails[];
  reviewsList:Review[];
  recommendedMoviesList:Movie[];
  similarMoviesList:Movie[];

  constructor(private route: ActivatedRoute,private moviesService : MoviesService, private modalService: NgbModal) {
    this.id = "";
    this.movieDetails = new MovieDetails();
    this.videoObj = new Video();
    this.inListStatus = false;
    this.removeStatus = false;
    this.addStatus = false;
    this.castDetailsList = [];
    this.reviewsList = [];
    this.recommendedMoviesList = [];
    this.similarMoviesList = [];
   }

  ngOnInit(): void {
    // this.id = this.route.snapshot.paramMap.get('id');
    this.id = this.route.snapshot.params.id;
    this.fetchMovieDetails(this.id);
    // console.log(this.id);
    this.fetchMovieVideo(this.id);
    this.checkWatchList(this.id);
    this.fetchMovieCast(this.id);
    this.fetchMovieReviews(this.id);
    this.fetchRecommendedMovies(this.id);
    this.fetchSimilarMovies(this.id);
    this.addToContinueList(this.id);
  }

  fetchMovieDetails(movieId:string){
    this.moviesService.getMovieDetails(movieId).subscribe(
      res => {
        this.movieDetails = res;
      }
    );
  }

  fetchMovieVideo(movidId:string){
    this.moviesService.getVideoUrl(movidId).subscribe(
      res => {
        this.videoObj = res;
      }
    );
  }

  //Checks if myList contains specified movieId
  checkWatchList(movieId:string){
    let savedMyList = localStorage.getItem('myList');
    if(savedMyList!=null){
      let myList = JSON.parse(savedMyList);
      if(myList.includes(movieId)){
        this.inListStatus = true;
      }
    }
  }

  addToWatchList(movieId:string){
    let savedMyList = localStorage.getItem('myList');
    if(savedMyList!=null){
      let myList = JSON.parse(savedMyList);
      if(!myList.includes(movieId)){
        myList.push(movieId);
        localStorage.setItem('myList',JSON.stringify(myList));
      }
    }
    else{
      let myList = [];
      myList.push(movieId);
      localStorage.setItem('myList',JSON.stringify(myList));
    }
    this.inListStatus = true;
    this.removeStatus = false;
    this.addStatus = true;
  }

  removeFromWatchList(movieId:string){
    let savedMyList = localStorage.getItem('myList');
    if(savedMyList!=null){
      let myList = JSON.parse(savedMyList);
      let newList: string[] = [];
      myList.forEach((currentId: string) => {
        if(currentId!=movieId){
          newList.push(currentId);
        }
      });
      localStorage.setItem('myList',JSON.stringify(newList));
      this.inListStatus = false;
      this.removeStatus = true;
      this.addStatus = false;
    }
  }

  //Fetch cast for movie based on movieId
  fetchMovieCast(movieId:string){
    this.moviesService.getMovieCast(movieId).subscribe(
      res => {
        this.castDetailsList = res;
      }
    );
  }

  //Fetch reviews for movie based on movieId
  fetchMovieReviews(movieId:string){
    this.moviesService.getMovieReviews(movieId).subscribe(
      res => {
        this.reviewsList = res;
      }
    );
  }

  // open() {
  //   const modalRef = this.modalService.open(NgbdModalContent);
  //   modalRef.componentInstance.name = 'World';
  // }

  //Get recommended movies
  fetchRecommendedMovies(movieId:string){
    this.moviesService.getRecommended(movieId).subscribe(
      res => {
        this.recommendedMoviesList = res;
      }
    )
  }

  //Get similar movies
  fetchSimilarMovies(movieId:string){
    this.moviesService.getSimilar(movieId).subscribe(
      res => {
        this.similarMoviesList = res;
      }
    )
  }

  addToContinueList(movieId:string){
    let continueList = localStorage.getItem('continueList');
    if(continueList!=null){
      let myContinueList = JSON.parse(continueList);
      if(!myContinueList.includes(movieId)){
          myContinueList.push(movieId);
          localStorage.setItem('continueList',JSON.stringify(myContinueList));
      }
    }
    else{
      let myContinueList = [];
      myContinueList.push(movieId);
      localStorage.setItem('continueList',JSON.stringify(myContinueList));
    }
  }

  addToContinueShowList(showId:string){
    let continueList = localStorage.getItem('continueShowList');
    if(continueList!=null){
      let myContinueList = JSON.parse(continueList);
      if(!myContinueList.includes(showId)){
          myContinueList.push(showId);
          localStorage.setItem('continueShowList',JSON.stringify(myContinueList));
      }
    }
    else{
      let myContinueList = [];
      myContinueList.push(showId);
      localStorage.setItem('continueShowList',JSON.stringify(myContinueList));
    }
  }

}
