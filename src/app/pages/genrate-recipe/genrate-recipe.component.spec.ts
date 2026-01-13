import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenrateRecipeComponent } from './genrate-recipe.component';

describe('GenrateRecipeComponent', () => {
  let component: GenrateRecipeComponent;
  let fixture: ComponentFixture<GenrateRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenrateRecipeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenrateRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
