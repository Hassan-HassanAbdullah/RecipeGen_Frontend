import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeGenrateCardComponent } from './recipe-genrate-card.component';

describe('RecipeGenrateCardComponent', () => {
  let component: RecipeGenrateCardComponent;
  let fixture: ComponentFixture<RecipeGenrateCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeGenrateCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeGenrateCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
