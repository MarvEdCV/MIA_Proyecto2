import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoCLientesComponent } from './repo-clientes.component';

describe('RepoCLientesComponent', () => {
  let component: RepoCLientesComponent;
  let fixture: ComponentFixture<RepoCLientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepoCLientesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepoCLientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
