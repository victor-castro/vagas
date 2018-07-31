import { Component, OnInit } from '@angular/core';
import { JobsService } from '../../../../services/jobs/jobs.service';
import { IssuesEntity } from '../../../../entities/issues.entity';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../../../store';
import { JobsType } from '../../../../enums/jobs-type.enum';
import { SET_REPO } from '../../../../actions';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs/Observable';
import { Query } from '@angular/compiler/src/core';
import { map } from 'rxjs/operators';
import gql from 'graphql-tag';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  jobs: Observable<IssuesEntity>;
  selectJobs;
  selectedValue: string;
  loading = false;

  constructor(
    private $jobs: JobsService,
    private ngRedux: NgRedux<IAppState>,
    private apollo: Apollo
  ) {
    // this.ngRedux.subscribe(() => this.readState());
    // this.readState();

    this.selectJobs = [
      { value: JobsType.frontEnd, viewValue: 'Front-End' },
      { value: JobsType.backEnd, viewValue: 'Back-End' },
      { value: JobsType.php, viewValue: 'PHP' },
      { value: JobsType.ios, viewValue: 'IOS' },
      { value: JobsType.android, viewValue: 'Android' }
    ]
  }

  ngOnInit() {
    this.jobs = this.apollo.watchQuery<IssuesEntity>({
      query: gql`
        query {
          organization(login:"frontendbr") {
            login
            repository(name: "vagas") {
              name
              issues(last:10) {
                edges {
                  node {
                    title
                  }
                }
                totalCount
              }
            }
          }
        }
      `
    })
      .valueChanges
      .pipe(
        map(result => result.data)
      );
    this.jobs.subscribe(v => console.log(v));
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

  login() {
    // this.$auth.login();
  }

  selectJob() {
    this.ngRedux.dispatch({ type: SET_REPO, repo: this.selectedValue })
  }

  readState() {
    this.getJobs();
  }

}
