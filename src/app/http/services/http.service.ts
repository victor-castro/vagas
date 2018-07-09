import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { HttpEndpoint } from '../models/http-endpoint'

@Injectable()
export class HttpService {
  protected endpoint: HttpEndpoint;
  protected path: string;
  protected _filters: Object = {};

  constructor(protected $http: HttpClient) { 
  }

  set filters(filters: Object) {
    this._filters = filters;
  }

  private get queryString(): string {
      let queryString = '';

      for (let i in this._filters) {
          queryString += i + '=' + this._filters[i] + '&';
      }

      queryString = queryString.substring(0, queryString.length - 1);
      return queryString;
  }

  public load() {
    const queryString = this.queryString;
    let path = this.endpoint.path;

    if (queryString != '') {
      path = this.endpoint.path + '?' + queryString;
    }

    return this.$http.get(path)
                .map(this.parseSuccess)
                .catch(this.parseError);
  }

  protected parseSuccess(res: any) {
      return (res instanceof Response) ? res.json() : res;
  }

  protected parseError = (error: any) => {

      switch(error.status) {
          case 422:
              return Observable.throw({ 
                  status: error.status, 
                  error: 'Erro ao validar os dados.', 
                  fields: error.json() 
              });

          case 400:
              return this.parse400(error);
          case 500:
              return Observable.throw({ 
                  status: error.status, 
                  error: 'Oops. Ocorreu um problema inesperado.' 
              });
          
          case 401:
              return this.parse401(error);

          case 402:
              return this.parse402(error);

          default:
              console.log(error);
              return Observable.throw({ 
                  status: error.status, 
                  error: error.json().error || 'Server error'
              });
      }
  }
  protected parse400(error) : Observable<any> {
      let msg = (error.json().error == 'InvalidCredentials') ? 'Senha incorreta' : error.json().error ;
      return Observable.throw({ 
          status: error.status, 
          error: msg
      });
  }

  protected parse401(error) : Observable<any> {
      return Observable.throw({ 
          status: error.status, 
          error: 'Acesso não autorizado'
      });
  }

  protected parse402(error) : Observable<any> {
      return Observable.throw({ 
          status: error.status, 
          error: 'Acesso não autorizado'
      });
  }


}
