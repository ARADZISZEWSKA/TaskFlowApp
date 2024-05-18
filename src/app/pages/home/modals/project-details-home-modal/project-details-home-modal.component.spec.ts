import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProjectDetailsHomeModalComponent } from './project-details-home-modal.component';

describe('ProjectDetailsHomeModalComponent', () => {
  let component: ProjectDetailsHomeModalComponent;
  let fixture: ComponentFixture<ProjectDetailsHomeModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectDetailsHomeModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectDetailsHomeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
