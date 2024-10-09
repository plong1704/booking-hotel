import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveshowImageDialogComponent } from './liveshow-image-dialog.component';

describe('LiveshowImageDialogComponent', () => {
  let component: LiveshowImageDialogComponent;
  let fixture: ComponentFixture<LiveshowImageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiveshowImageDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiveshowImageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
