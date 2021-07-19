export class Review{
  author:string;
  content:string;
  created_at:string;
  url:string;
  rating:number;
  avatar_path:string;

  constructor(){
    this.author = "";
    this.content = "";
    this.created_at = "";
    this.url = "";
    this.rating = 0;
    this.avatar_path = "";
  }
}
