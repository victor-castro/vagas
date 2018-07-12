import { Injectable } from '@angular/core';
import { IssuesResource } from '../../resources/issues/issues.resource';
import { RepoResource } from '../../resources/repo/repo.resource';
import { RepoEntity } from '../../entities/repo.entity';
import { IssuesEntity } from '../../entities/issues.entity';

@Injectable()
export class JobsService {
  perPages: number = 100;
  pagesCount: number;
  repo: RepoEntity;

  constructor(
    protected $issueResource: IssuesResource,
    protected $repoResource: RepoResource,
  ) {
  }

  async getRepo():Promise<any> {
    this.repo = await this.$repoResource.load().toPromise();
    this._calcPages();
  }

  async getIssues(currentPage):Promise<IssuesEntity> {

    try {

      await this.getRepo();


      if (this.repo.open_issues_count > this.perPages) {

        if (currentPage > this.pagesCount) {
          alert('Fim da lista de vagas!');
          return;
        }

        this.$issueResource.filters = {
          page: currentPage,
          per_page: this.perPages
        };
      }
  
      return await this.$issueResource.load().toPromise();
      
    } catch (error) {
      console.error(error);
    }
    
  }

  protected _calcPages() {
    this.pagesCount = this.repo.open_issues_count / this.perPages;
  }

}
