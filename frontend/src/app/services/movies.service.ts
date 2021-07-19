import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Movie } from '../models/Movie';
import { MovieDetails } from '../models/MovieDetails';
import { Video } from '../models/Video';
import { CastDetails } from '../models/CastDetails';
import { Review } from '../models/Review';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  mainUrl:string;

  constructor(private httpClient: HttpClient) {
    this.mainUrl = "https://homework8-309517.wl.r.appspot.com/apis/movies";
    // this.mainUrl = "http://localhost:8080/apis/movies";
  }

  getCurrentlyPlayingMovies():Observable<Movie[]>{
    let url = `${this.mainUrl}/getCurrentlyPlaying`;
    return this.httpClient.get<Movie[]>(url);
  }

  getPopularMovies():Observable<Movie[]>{
    let url = `${this.mainUrl}/getPopular`;
    return this.httpClient.get<Movie[]>(url);
  }

  getTopRatedMovies():Observable<Movie[]>{
    let url = `${this.mainUrl}/getTopRated`;
    return this.httpClient.get<Movie[]>(url);
  }

  getTrendingMovies():Observable<Movie[]>{
    let url = `${this.mainUrl}/getTopTrending`;
    return this.httpClient.get<Movie[]>(url);
  }

  //Details methods

  getMovieDetails(movieId:string):Observable<MovieDetails>{
    let url = `${this.mainUrl}/getDetails/${movieId}`;
    return this.httpClient.get<MovieDetails>(url);
  }

  getVideoUrl(movieId:string):Observable<Video>{
    let url = `${this.mainUrl}/getVideo/${movieId}`;
    return this.httpClient.get<Video>(url);
  }

  //Get cast for movie based on movieId
  getMovieCast(movieId:string):Observable<CastDetails[]>{
    let url = `${this.mainUrl}/getCast/${movieId}`;
    return this.httpClient.get<CastDetails[]>(url);
  }

  //Get reviews
  getMovieReviews(movieId:string):Observable<Review[]>{
    let url = `${this.mainUrl}/getReviews/${movieId}`;
    return this.httpClient.get<Review[]>(url);
  }

  //Get recommended movies
  getRecommended(movieId:string):Observable<Movie[]>{
    let url = `${this.mainUrl}/getRecommended/${movieId}`;
    return this.httpClient.get<Movie[]>(url);
  }

  //Get similar movies
  getSimilar(movieId:string):Observable<Movie[]>{
    let url = `${this.mainUrl}/getSimilar/${movieId}`;
    return this.httpClient.get<Movie[]>(url);
  }
}
