import { Injectable } from '@angular/core';
import { IssuesResource } from '../../resources/issues/issues.resource';
import { RepoResource } from '../../resources/repo/repo.resource';
import { RepoEntity } from '../../entities/repo.entity';
import { IssuesEntity } from '../../entities/issues.entity';

@Injectable()
export class JobsService {
  numberPages: number = 100;
  pagesCount: number;
  repo: RepoEntity;

  constructor(
    protected $issueResource: IssuesResource,
    protected $repoResource: RepoResource
  ) {
    this.getRepo();
  }

  async getRepo():Promise<any> {
    this.repo = await this.$repoResource.load().toPromise();
    this._calcPages();
  }

  async getIssues(currentPage):Promise<IssuesEntity> {
    if (currentPage > this.pagesCount) {
      alert('Fim da lista de vagas!');
      return;
    }

    this.$issueResource.filters = {
      page: currentPage,
      per_page: this.numberPages
    };

  	return await this.$issueResource.load().toPromise();
  }

  protected _calcPages() {
    this.pagesCount = this.repo.open_issues_count / this.numberPages;
  }

}
