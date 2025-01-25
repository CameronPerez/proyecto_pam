import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroCategoriasPage } from './registro-categorias.page';

describe('RegistroCategoriasPage', () => {
  let component: RegistroCategoriasPage;
  let fixture: ComponentFixture<RegistroCategoriasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroCategoriasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
