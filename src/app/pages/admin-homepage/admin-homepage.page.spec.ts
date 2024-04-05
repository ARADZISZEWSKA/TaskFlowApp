import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminHomepagePage } from './admin-homepage.page';

describe('AdminHomepagePage', () => {
  let component: AdminHomepagePage;
  let fixture: ComponentFixture<AdminHomepagePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AdminHomepagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
