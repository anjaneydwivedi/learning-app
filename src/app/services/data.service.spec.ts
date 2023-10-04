import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';

describe('DataService', () => {

  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(DataService);
    //let http = new HttpClient();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getDataList method', () => {
    spyOn(service['http'], 'get');
    service.getDataList();
    expect(service['http'].get).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/posts'
    );
  });

});
