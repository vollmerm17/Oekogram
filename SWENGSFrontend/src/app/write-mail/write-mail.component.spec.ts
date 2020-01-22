import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteMailComponent } from './write-mail.component';

describe('WriteMailComponent', () => {
  let component: WriteMailComponent;
  let fixture: ComponentFixture<WriteMailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WriteMailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WriteMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
