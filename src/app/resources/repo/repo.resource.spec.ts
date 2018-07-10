import { TestBed, inject } from '@angular/core/testing';

import { RepoResource } from './repo.resource';

describe('RepoResource', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RepoResource]
    });
  });

  it('should be created', inject([RepoResource], (service: RepoResource) => {
    expect(service).toBeTruthy();
  }));
});
