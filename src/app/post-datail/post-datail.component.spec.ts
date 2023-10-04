import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDatailComponent } from './post-datail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { DataService } from '../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

describe('PostDatailComponent', () => {
  let component: PostDatailComponent;
  let fixture: ComponentFixture<PostDatailComponent>;
  let router = {
    navigate: jasmine.createSpy()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostDatailComponent ],
      imports:[ HttpClientModule, RouterTestingModule ],
      providers:[
        DataService,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({
              id: 1,
            }),
          }
        },
        {
          provide: Router,
          useValue: router
        },

      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostDatailComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit call', async () => {
    await component.ngOnInit();
    expect(component.id).toEqual(1);
  });

  it('call goback and redirect to data list page', async () => {
    //spyOn(router, 'navigate').and.stub();
    await component.goBack();
    expect(router.navigate).toHaveBeenCalledWith(['/'])
  });


});
