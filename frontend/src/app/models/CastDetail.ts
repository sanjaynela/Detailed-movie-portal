export class CastDetail{
  birthday:string;
  place_of_birth:string;
  gender:string;
  name:string;
  homepage:string;
  known_for_department:string;
  also_known_as:string[];
  biography:string;
  profile_path:string;

  constructor(){
    this.birthday = "";
    this.place_of_birth = "";
    this.gender = "";
    this.known_for_department = "";
    this.also_known_as = [];
    this.name = "";
    this.homepage = "";
    this.biography = "";
    this.profile_path = "";
  }
}
