import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { IAppState, rootReducer, INITIAL_STATE } from '../../store';

import { HomePageComponent } from './home-page/home-page/home-page.component';
import { IssuesResource } from '../../resources/issues/issues.resource';
import { RepoResource } from '../../resources/repo/repo.resource';
import { JobsService } from '../../services/jobs/jobs.service';
import { HttpModule } from '../../http/http.module';
import { HomeRoutingModule } from './home-routing.module';
import { MatButtonModule, MatToolbarModule, MatIconModule, MatCardModule, MatInputModule, MatListModule, MatSelectModule, MatSpinner, MatProgressSpinnerModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    HomeRoutingModule,
    FormsModule,
    NgReduxModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ],
  declarations: [HomePageComponent],
  providers: [
    IssuesResource,
    RepoResource,
    JobsService
  ],
})
export class HomeModule {
  constructor (ngRedux: NgRedux<IAppState>) {
      ngRedux.configureStore(rootReducer, INITIAL_STATE);
  }
}
