import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationUpdateComponent } from './station-update.component';

describe('StationUpdateComponent', () => {
  let component: StationUpdateComponent;
  let fixture: ComponentFixture<StationUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StationUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StationUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
