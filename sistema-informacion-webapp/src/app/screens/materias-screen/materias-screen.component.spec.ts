import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriasScreenComponent } from './materias-screen.component';

describe('MateriasScreenComponent', () => {
  let component: MateriasScreenComponent;
  let fixture: ComponentFixture<MateriasScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MateriasScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MateriasScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
