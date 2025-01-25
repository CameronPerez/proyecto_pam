import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerPresupuestoPage } from './ver-presupuesto.page';

describe('VerPresupuestoPage', () => {
  let component: VerPresupuestoPage;
  let fixture: ComponentFixture<VerPresupuestoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VerPresupuestoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
