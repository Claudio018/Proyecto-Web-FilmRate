import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeerResenaPage } from './leer-resena.page';

describe('LeerResenaPage', () => {
  let component: LeerResenaPage;
  let fixture: ComponentFixture<LeerResenaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LeerResenaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
