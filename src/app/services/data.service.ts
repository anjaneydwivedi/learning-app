import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * @document service
 * @name DataService
 * @description Service to handle stories
 */

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  /**
   * @description This method is used to get data list
   * @memberof DataService
   */
  getDataList(): Observable<number[]> {
    return this.http.get<number[]>(`${this.apiUrl}`);
  }

  setRowDetails(rowData:any){
    localStorage.setItem('rowData',JSON.stringify(rowData));
  }

  getRowDetails(){
    let data:any = localStorage.getItem('rowData');
    return JSON.parse(data);
  }
}
