import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HumanAngularLib } from './human-angular-lib';

describe('HumanAngularLib', () => {
  let component: HumanAngularLib;
  let fixture: ComponentFixture<HumanAngularLib>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HumanAngularLib]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HumanAngularLib);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
