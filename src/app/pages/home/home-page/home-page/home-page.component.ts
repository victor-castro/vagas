import { Component, OnInit } from '@angular/core';
import { JobsService } from '../../../../services/jobs/jobs.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  jobs;
  
  constructor(
    private $jobs: JobsService
  ) { }

  ngOnInit() {
    this.$jobs.getIssues(1)
      .then(
        jobs => {
          this.jobs = jobs,
          console.log(this.jobs);

        },
        rejected => console.error(rejected)
      );
  }

}
