import { Component } from '@angular/core';
import { LeetcodeComponent } from '../leetcode/leetcode.component';
import { AboutComponent } from '../about/about.component';
import { PublicationsComponent } from '../publications/publications.component';
import { ContactComponent } from '../contact/contact.component';
import { ProjectsComponent } from '../projects/projects.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LeetcodeComponent, AboutComponent, PublicationsComponent, ContactComponent, ProjectsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
