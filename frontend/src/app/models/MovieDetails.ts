export class MovieDetails{
  title:string;
  genres:string[];
  languages:string[];
  release_date:string;
  runtime:string;
  overview:string;
  vote_average:number;
  tagline:string;
  poster_path:string;
  id:string;
  type:string;

  constructor(){
    this.title = "";
    this.genres = [];
    this.languages = [];
    this.release_date = "";
    this.runtime = "";
    this.overview = "";
    this.vote_average = 0;
    this.tagline = "";
    this.poster_path = "";
    this.id = "";
    this.type = "";
  }
}
