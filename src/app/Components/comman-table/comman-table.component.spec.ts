import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommanTableComponent } from './comman-table.component';

describe('CommanTableComponent', () => {
  let component: CommanTableComponent;
  let fixture: ComponentFixture<CommanTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommanTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommanTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
