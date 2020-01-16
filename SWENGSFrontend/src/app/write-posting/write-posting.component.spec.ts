import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WritePostingComponent } from './write-posting.component';

describe('WritePostingComponent', () => {
  let component: WritePostingComponent;
  let fixture: ComponentFixture<WritePostingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WritePostingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WritePostingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
