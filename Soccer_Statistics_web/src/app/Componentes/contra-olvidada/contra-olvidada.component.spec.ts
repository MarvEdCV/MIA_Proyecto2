import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContraOlvidadaComponent } from './contra-olvidada.component';

describe('ContraOlvidadaComponent', () => {
  let component: ContraOlvidadaComponent;
  let fixture: ComponentFixture<ContraOlvidadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContraOlvidadaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContraOlvidadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
