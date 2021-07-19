import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CastDetails } from 'src/app/models/CastDetails';
import { Review } from 'src/app/models/Review';
import { Show } from 'src/app/models/Show';
import { ShowDetails } from 'src/app/models/ShowDetails';
import { Video } from 'src/app/models/Video';
import { ShowsService } from 'src/app/services/shows.service';

@Component({
  selector: 'app-show-details-page',
  templateUrl: './show-details-page.component.html',
  styleUrls: ['./show-details-page.component.css']
})
export class ShowDetailsPageComponent implements OnInit {
  id:string;
  showDetails:ShowDetails;
  videoObj:Video;
  inListStatus:boolean;
  removeStatus:boolean;
  addStatus:boolean;
  castDetailsList:CastDetails[];
  reviewsList:Review[];
  recommendedShowsList:Show[];
  similarShowsList: Show[];

  constructor(private showsService : ShowsService,private route: ActivatedRoute) {
    this.id = "";
    this.showDetails = new ShowDetails();
    this.videoObj = new Video();
    this.inListStatus = false;
    this.removeStatus = false;
    this.addStatus = false;
    this.castDetailsList = [];
    this.reviewsList = [];
    this.recommendedShowsList = [];
    this.similarShowsList = [];
  }

  ngOnInit(): void {
    // this.id = this.route.snapshot.paramMap.get('id');
    this.id = this.route.snapshot.params.id;
    this.fetchShowDetails(this.id);
    this.fetchShowVideo(this.id);
    this.checkWatchList(this.id);
    this.fetchMovieCast(this.id);
    this.fetchShowReviews(this.id);
    this.fetchRecommendedShows(this.id);
    this.fetchSimilarShows(this.id);
    this.addToContinueList(this.id);
  }

  fetchShowDetails(showId:string){
    this.showsService.getShowDetails(showId).subscribe(
      res => {
        this.showDetails = res;
      }
    );
  }

  fetchShowVideo(showId:string){
    this.showsService.getVideoUrl(showId).subscribe(
      res => {
        this.videoObj = res;
      }
    );
  }

  //Checks if myList contains specified movieId
  checkWatchList(showId:string){
    let savedMyList = localStorage.getItem('myList');
    if(savedMyList!=null){
      let myList = JSON.parse(savedMyList);
      if(myList.includes(showId)){
        this.inListStatus = true;
      }
    }
  }

  addToWatchList(showId:string){
    let savedMyList = localStorage.getItem('myList');
    if(savedMyList!=null){
      let myList = JSON.parse(savedMyList);
      if(!myList.includes(showId)){
        myList.push(showId);
        localStorage.setItem('myList',JSON.stringify(myList));
      }
    }
    else{
      let myList = [];
      myList.push(showId);
      localStorage.setItem('myList',JSON.stringify(myList));
    }
    this.inListStatus = true;
    this.removeStatus = false;
    this.addStatus = true;
  }

  removeFromWatchList(showId:string){
    let savedMyList = localStorage.getItem('myList');
    if(savedMyList!=null){
      let myList = JSON.parse(savedMyList);
      let newList: string[] = [];
      myList.forEach((currentId: string) => {
        if(currentId!=showId){
          newList.push(currentId);
        }
      });
      localStorage.setItem('myList',JSON.stringify(newList));
      this.inListStatus = false;
      this.removeStatus = true;
      this.addStatus = false;
    }
  }

  //Fetch cast for movie based on showId
  fetchMovieCast(showId:string){
    this.showsService.getShowCast(showId).subscribe(
      res => {
        this.castDetailsList = res;
      }
    );
  }

  //Fetch reviews for movie based on showId
  fetchShowReviews(showId:string){
    this.showsService.getShowReviews(showId).subscribe(
      res => {
        this.reviewsList = res;
      }
    );
  }

  // // open() {
  // //   const modalRef = this.modalService.open(NgbdModalContent);
  // //   modalRef.componentInstance.name = 'World';
  // // }

  //Get recommended shows
  fetchRecommendedShows(showId:string){
    this.showsService.getRecommended(showId).subscribe(
      res => {
        this.recommendedShowsList = res;
      }
    )
  }

  //Get similar shows
  fetchSimilarShows(showId:string){
    this.showsService.getSimilar(showId).subscribe(
      res => {
        this.similarShowsList = res;
      }
    )
  }

  addToContinueList(showId:string){
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
