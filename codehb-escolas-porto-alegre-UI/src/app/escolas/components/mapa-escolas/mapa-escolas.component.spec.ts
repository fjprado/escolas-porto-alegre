import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaEscolasComponent } from './mapa-escolas.component';

describe('MapaEscolasComponent', () => {
  let component: MapaEscolasComponent;
  let fixture: ComponentFixture<MapaEscolasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapaEscolasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaEscolasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
