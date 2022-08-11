import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DispalyComponent } from './dispaly.component';

describe('DispalyComponent', () => {
  let component: DispalyComponent;
  let fixture: ComponentFixture<DispalyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DispalyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DispalyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
