import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HumanComponent } from './human-angular-lib';

describe('HumanComponent', () => {
  let component: HumanComponent;
  let fixture: ComponentFixture<HumanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HumanComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HumanComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
