import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { SettingsAdminPage } from './settings-admin.page';

describe('SettingsAdminPage', () => {
  let component: SettingsAdminPage;
  let fixture: ComponentFixture<SettingsAdminPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SettingsAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
