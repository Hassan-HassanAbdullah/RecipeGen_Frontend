import { TestBed } from '@angular/core/testing';

import { DownloadRecipeService } from './download-recipe.service';

describe('DownloadRecipeService', () => {
  let service: DownloadRecipeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DownloadRecipeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
