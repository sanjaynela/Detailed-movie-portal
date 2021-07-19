import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { CastDetail } from '../models/CastDetail';
import { CastExternals } from '../models/CastExternals';

@Injectable({
  providedIn: 'root'
})
export class CastService {
  mainUrl:string;

  constructor(private httpClient: HttpClient) {
    this.mainUrl = "https://homework8-309517.wl.r.appspot.com/apis/cast";
    // this.mainUrl = "http://localhost:8080/apis/cast";
  }

    //Get details based on castId
    getCastDetails(castId:string):Observable<CastDetail>{
      let url = `${this.mainUrl}/getDetails/${castId}`;
      return this.httpClient.get<CastDetail>(url);
    }

    //Get externals based on castId
    getExternalDetails(castId:string):Observable<CastExternals>{
      let url = `${this.mainUrl}/getExternals/${castId}`;
      return this.httpClient.get<CastExternals>(url);
    }

}
