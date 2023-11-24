import { TestBed } from '@angular/core/testing';

import { DropFileService } from './drop-file.service';

describe('DropFileService', () => {
  let service: DropFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DropFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
