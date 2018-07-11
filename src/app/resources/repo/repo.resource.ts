import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpService } from '../../http/services/http.service';
import { HttpEndpoint } from '../../http/models/http-endpoint';
import { IAppState } from '../../store';
import { NgRedux } from '@angular-redux/store';

@Injectable()
export class RepoResource extends HttpService {
  state: IAppState;
  
  constructor(
    protected $http: HttpClient,
    private ngRedux: NgRedux<IAppState>
  ) {
    super($http);
    this.ngRedux.subscribe(() => this.readState());
    this.readState();
  }

  readState() {
    this.state = this.ngRedux.getState() as IAppState;

    this.endpoint = new HttpEndpoint(`repos/${this.state.repo}/vagas`);
  }
  
}
