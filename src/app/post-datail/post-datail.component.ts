import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-post-datail',
  templateUrl: './post-datail.component.html',
  styleUrls: ['./post-datail.component.css']
})
export class PostDatailComponent implements OnInit {

  public id:number=-1;
  public rowData:any;
  constructor(private route: ActivatedRoute,
    private dataService: DataService,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      if(this.id > 0){
        this.rowData = this.dataService.getRowDetails();
      }
    });
  }

  goBack(): void {
    // Navigate back to the data list page
    this.router.navigate(['/']);
  }

}
