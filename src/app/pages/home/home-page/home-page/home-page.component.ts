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

  constructor(
    private $jobs: JobsService,
    private ngRedux: NgRedux<IAppState>
  ) {
    this.ngRedux.subscribe(() => this.readState());
    this.readState();
  }

  ngOnInit() {
    // Teste de troca de repositorio
    setTimeout(() => {
      this.ngRedux.dispatch({ type: SET_REPO, repo: JobsType.backEnd })
    }, 3000);
  }

  getJobs() {
    this.$jobs.getIssues(1)
      .then(
        jobs => {
          this.jobs = jobs,
          console.log(this.jobs);
          
        },
        rejected => console.error(rejected)
      );
  }

  readState() {
    const state: IAppState = this.ngRedux.getState() as IAppState;

    this.getJobs();

    console.log(state);
  }

}
