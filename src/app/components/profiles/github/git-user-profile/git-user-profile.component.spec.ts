import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GitUserProfileComponent } from './git-user-profile.component';

describe('GitUserProfileComponent', () => {
  let component: GitUserProfileComponent;
  let fixture: ComponentFixture<GitUserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GitUserProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GitUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
