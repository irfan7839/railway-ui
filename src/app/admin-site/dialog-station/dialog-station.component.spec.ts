import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogStationComponent } from './dialog-station.component';

describe('DialogStationComponent', () => {
  let component: DialogStationComponent;
  let fixture: ComponentFixture<DialogStationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogStationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
