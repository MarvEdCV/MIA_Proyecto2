import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegAdmEmpComponent } from './reg-adm-emp.component';

describe('RegAdmEmpComponent', () => {
  let component: RegAdmEmpComponent;
  let fixture: ComponentFixture<RegAdmEmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegAdmEmpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegAdmEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
