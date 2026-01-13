import { TestBed } from '@angular/core/testing';

import { UploadRecipesService } from './upload-recipes.service';

describe('UploadRecipesService', () => {
  let service: UploadRecipesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadRecipesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
