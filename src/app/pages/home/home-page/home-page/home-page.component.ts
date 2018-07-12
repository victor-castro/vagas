import { Component, OnInit } from '@angular/core';
import { JobsService } from '../../../../services/jobs/jobs.service';
import { IssuesEntity } from '../../../../entities/issues.entity';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../../../store';
import { JobsType } from '../../../../enums/jobs-type.enum';
import { SET_REPO } from '../../../../actions';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  jobs: IssuesEntity;
  selectJobs;
  selectedValue: string;
  loading = false;

  constructor(
    private $jobs: JobsService,
    private ngRedux: NgRedux<IAppState>
  ) {
    this.ngRedux.subscribe(() => this.readState());
    this.readState();

    this.selectJobs = [
      { value: JobsType.frontEnd, viewValue: 'Front-End' },
      { value: JobsType.backEnd, viewValue: 'Back-End' },
      { value: JobsType.php, viewValue: 'PHP' },
      { value: JobsType.ios, viewValue: 'IOS' },
      { value: JobsType.android, viewValue: 'Android' }
    ]
  }

  ngOnInit() {
  }

  getJobs() {
    this.loading = true; 

    this.$jobs.getIssues(1)
      .then(
        jobs => {
          this.jobs = jobs;
          this.loading = false; 
        },
        rejected => {
          console.error(rejected);
          this.loading = false; 
        }
      );
  }

  selectJob() {
    this.ngRedux.dispatch({ type: SET_REPO, repo: this.selectedValue })
  }

  readState() {
    this.getJobs();
  }

}
