import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedCarsComponent } from './featured-cars.component';

describe('FeaturedCarsComponent', () => {
  let component: FeaturedCarsComponent;
  let fixture: ComponentFixture<FeaturedCarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeaturedCarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
