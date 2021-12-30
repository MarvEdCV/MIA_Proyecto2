import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoEmpComponent } from './repo-emp.component';

describe('RepoEmpComponent', () => {
  let component: RepoEmpComponent;
  let fixture: ComponentFixture<RepoEmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepoEmpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepoEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
