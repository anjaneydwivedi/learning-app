import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})

/**
 * @class FooterComponent
 * @description Class used for displaying footer content
 */
export class FooterComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  /**
   * @description This method is used to get current year
   * @memberof FooterComponent
   */
  public currentYear(): number {
    return new Date().getFullYear();
  }
}
