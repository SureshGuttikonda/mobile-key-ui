import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MobileKeyService {

  baseUrl: string = 'http://localhost:8080/mobile_key/';
  constructor(private httpClient: HttpClient) { }

  getMobileKeys(mobileNbr: string, pageNbr: number, nbrOfRecords: number): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + mobileNbr + '?pageNbr=' + pageNbr + '&recordsPerPage=' + nbrOfRecords);
  }
}
