import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UplodeRecipeComponent } from './uplode-recipe.component';

describe('UplodeRecipeComponent', () => {
  let component: UplodeRecipeComponent;
  let fixture: ComponentFixture<UplodeRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UplodeRecipeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UplodeRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
