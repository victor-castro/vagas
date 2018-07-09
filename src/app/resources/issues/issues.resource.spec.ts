import { TestBed, inject } from '@angular/core/testing';

import { IssuesResource } from './issues.resource';

describe('IssuesResource', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IssuesResource]
    });
  });

  it('should be created', inject([IssuesResource], (service: IssuesResource) => {
    expect(service).toBeTruthy();
  }));
});
