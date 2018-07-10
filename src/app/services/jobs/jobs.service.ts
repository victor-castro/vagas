import { Injectable } from '@angular/core';
import { IssuesResource } from '../../resources/issues/issues.resource';
import { RepoResource } from '../../resources/repo/repo.resource';
import { RepoEntity } from '../../entities/repo.entity';
import { IssuesEntity } from '../../entities/issues.entity';
import { IAppState } from '../../store';
import { NgRedux } from '@angular-redux/store';

@Injectable()
export class JobsService {
  numberPages: number = 100;
  pagesCount: number;
  repo: RepoEntity;
  state: IAppState;

  constructor(
    protected $issueResource: IssuesResource,
    protected $repoResource: RepoResource,
    private ngRedux: NgRedux<IAppState>
  ) {
    this.ngRedux.subscribe(() => this.readState());
    this.readState();
  }

  readState() {
    this.state = this.ngRedux.getState() as IAppState;


    this.getRepo();
  }

  async getRepo():Promise<any> {
    this.repo = await this.$repoResource.load().toPromise();
    this._calcPages();
  }

  async getIssues(currentPage):Promise<IssuesEntity> {

    try {
      if (currentPage > this.pagesCount) {
        alert('Fim da lista de vagas!');
        return;
      }
  
      this.$issueResource.filters = {
        page: currentPage,
        per_page: this.numberPages
      };
  
      return await this.$issueResource.load().toPromise();
      
    } catch (error) {
      console.error(error);
    }
    
  }

  protected _calcPages() {
    this.pagesCount = this.repo.open_issues_count / this.numberPages;
  }

}
