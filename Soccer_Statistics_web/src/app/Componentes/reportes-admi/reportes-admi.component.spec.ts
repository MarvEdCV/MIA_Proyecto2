import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesAdmiComponent } from './reportes-admi.component';

describe('ReportesAdmiComponent', () => {
  let component: ReportesAdmiComponent;
  let fixture: ComponentFixture<ReportesAdmiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportesAdmiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportesAdmiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
