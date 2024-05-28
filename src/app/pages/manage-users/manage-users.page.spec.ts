import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ManageUsersPage } from './manage-users.page';

describe('ManageUsersPage', () => {
  let component: ManageUsersPage;
  let fixture: ComponentFixture<ManageUsersPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ManageUsersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
