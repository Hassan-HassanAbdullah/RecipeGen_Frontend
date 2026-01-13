import { TestBed } from '@angular/core/testing';

import { SaveRecipeService } from './save-recipe.service';

describe('SaveRecipeService', () => {
  let service: SaveRecipeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaveRecipeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
