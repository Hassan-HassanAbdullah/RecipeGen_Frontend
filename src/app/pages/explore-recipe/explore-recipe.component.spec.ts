import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreRecipeComponent } from './explore-recipe.component';

describe('ExploreRecipeComponent', () => {
  let component: ExploreRecipeComponent;
  let fixture: ComponentFixture<ExploreRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExploreRecipeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExploreRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
