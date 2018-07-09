import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageComponent } from './home-page/home-page/home-page.component';
import { IssuesResource } from '../../resources/issues/issues.resource';
import { RepoResource } from '../../resources/repo/repo.resource';
import { JobsService } from '../../services/jobs/jobs.service';
import { HttpModule } from '../../http/http.module';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    HomeRoutingModule
  ],
  declarations: [HomePageComponent],
  providers: [
    IssuesResource,
    RepoResource,
    JobsService
  ],
})
export class HomeModule { }
