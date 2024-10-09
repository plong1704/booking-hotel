import { Component, OnInit } from '@angular/core';
import { ProgressSpinnerService } from '../services/progress-spinner.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public progressSpinnerService: ProgressSpinnerService) { }

  ngOnInit(): void {
  }

}
