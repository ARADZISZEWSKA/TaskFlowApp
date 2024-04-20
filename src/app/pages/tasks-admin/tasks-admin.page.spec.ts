import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TasksAdminPage } from './tasks-admin.page';

describe('TasksAdminPage', () => {
  let component: TasksAdminPage;
  let fixture: ComponentFixture<TasksAdminPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TasksAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
