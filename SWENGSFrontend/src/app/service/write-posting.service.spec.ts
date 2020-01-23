import { TestBed } from '@angular/core/testing';

import { WritePostingService } from './write-posting.service';

describe('WritePostingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WritePostingService = TestBed.get(WritePostingService);
    expect(service).toBeTruthy();
  });
});
