import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Show } from '../models/Show';
import { ShowDetails } from '../models/ShowDetails';
import { Video } from '../models/Video';
import { CastDetails } from '../models/CastDetails';
import { Review } from '../models/Review';

@Injectable({
  providedIn: 'root'
})
export class ShowsService {

  mainUrl:string;

  constructor(private httpClient: HttpClient) {
    this.mainUrl = "https://homework8-309517.wl.r.appspot.com/apis/shows";
    // this.mainUrl = "http://localhost:8080/apis/shows";
  }

  getPopularShows():Observable<Show[]>{
    let url = `${this.mainUrl}/getPopular`;
    return this.httpClient.get<Show[]>(url);
  }

  getTopRatedShows():Observable<Show[]>{
    let url = `${this.mainUrl}/getTopRated`;
    return this.httpClient.get<Show[]>(url);
  }

  getTrendingShows():Observable<Show[]>{
    let url = `${this.mainUrl}/getTrending`;
    return this.httpClient.get<Show[]>(url);
  }

  //Details methods

  getShowDetails(showId:string):Observable<ShowDetails>{
    let url = `${this.mainUrl}/getDetails/${showId}`;
    return this.httpClient.get<ShowDetails>(url);
  }

  getVideoUrl(showId:string):Observable<Video>{
    let url = `${this.mainUrl}/getVideo/${showId}`;
    return this.httpClient.get<Video>(url);
  }

  //Get cast for show based on showId
  getShowCast(showId:string):Observable<CastDetails[]>{
    let url = `${this.mainUrl}/getCast/${showId}`;
    return this.httpClient.get<CastDetails[]>(url);
  }

  //Get reviews
  getShowReviews(showId:string):Observable<Review[]>{
    let url = `${this.mainUrl}/getReviews/${showId}`;
    return this.httpClient.get<Review[]>(url);
  }

  //Get recommended shows
  getRecommended(showId:string):Observable<Show[]>{
    let url = `${this.mainUrl}/getRecommended/${showId}`;
    return this.httpClient.get<Show[]>(url);
  }

  //Get similar shows
  getSimilar(showId:string):Observable<Show[]>{
    let url = `${this.mainUrl}/getSimilar/${showId}`;
    return this.httpClient.get<Show[]>(url);
  }
}
