import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-clinic-detail',
  templateUrl: './clinic-detail.component.html',
  styleUrls: ['./clinic-detail.component.css']
})
export class ClinicDetailComponent implements OnInit {
  params: Observable<Params>;

  constructor(private activatedRoute: ActivatedRoute) {
    this.params = activatedRoute.params;
  }

  ngOnInit() {
  }

}
