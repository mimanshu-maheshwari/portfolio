import { Component, inject, OnInit } from '@angular/core';
import { Publication } from '../../models/about-me.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-publications',
  standalone: false,

  templateUrl: './publications.component.html',
  styleUrl: './publications.component.scss',
})
export class PublicationsComponent implements OnInit {
  publications!: Array<Publication>;
  private location: Location = inject(Location);
  ngOnInit(): void {
    const state = this.location.getState() as any;
    this.publications = state.aboutMe.publications;
  }
}
