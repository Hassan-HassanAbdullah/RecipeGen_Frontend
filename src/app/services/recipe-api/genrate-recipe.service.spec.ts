import { TestBed } from '@angular/core/testing';

import { GenrateRecipeService } from './genrate-recipe.service';

describe('GenrateRecipeService', () => {
  let service: GenrateRecipeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenrateRecipeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
