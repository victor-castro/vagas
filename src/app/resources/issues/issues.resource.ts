import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpService } from '../../http/services/http.service';
import { HttpEndpoint } from '../../http/models/http-endpoint';

@Injectable()
export class IssuesResource extends HttpService {

  constructor(protected $http: HttpClient) {
  	super($http);

    this.endpoint = new HttpEndpoint('repos/frontendbr/vagas/issues');
  	this.filters = {
  		pages: 1,
  		per_pages: 100
  	};
  }

}
