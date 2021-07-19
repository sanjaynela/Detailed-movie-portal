export class ShowDetails{
  name:string;
  genres:string[];
  languages:string[];
  first_air_date:string;
  episode_run_time:string;
  overview:string;
  vote_average:number;
  tagline:string;
  poster_path:string;
  id:string;
  type:string;

  constructor(){
    this.name = "";
    this.genres = [];
    this.languages = [];
    this.first_air_date = "";
    this.episode_run_time = "";
    this.overview = "";
    this.vote_average = 0;
    this.tagline = "";
    this.poster_path = "";
    this.id = "";
    this.type = "";
  }
}
