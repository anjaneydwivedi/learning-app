import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostTableComponent } from './post-table.component';
import { DataService } from '../services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('PostTableComponent', () => {

  let component: PostTableComponent;
  let fixture: ComponentFixture<PostTableComponent>;
  let dataService:DataService;
  const fakeActivatedRoute = {
    snapshot: { data: {} }
  } as ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostTableComponent ],
      imports:[HttpClientModule, RouterTestingModule],
      providers:[DataService,{provide: ActivatedRoute, useValue: fakeActivatedRoute}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostTableComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(DataService);
    component.dataSource = new MatTableDataSource();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {

    let spy:jasmine.Spy;
    beforeEach(async () => {
      spy = spyOn(dataService,'getDataList').and.callThrough();
    });

    it('is loading true...', () => {
      expect(component.isLoading).toBeTrue();
    });

    // it('getDataList should have been called and set loader to false', async () =>{
    //   await component.ngOnInit();
    //   expect(dataService.getDataList).toHaveBeenCalled();

    //   expect(component.isLoading).toBeFalse();
    // });

  });

  describe('onSearch method', () => {

    it('set filter data to filter', () => {
      component['onSearch']('test');
      expect(component.dataSource.filter).toEqual('test');
    });

  });

});
