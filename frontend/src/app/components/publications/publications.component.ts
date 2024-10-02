import { Component } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { Publication } from '../../models/publication.model';

@Component({
  selector: 'app-publications',
  standalone: true,
  imports: [NgbCarouselModule],
  templateUrl: './publications.component.html',
  styleUrl: './publications.component.scss',
})
export class PublicationsComponent {
  publications!: Array<Publication>;
  constructor() {
    this.publications = [
      {
        heading: 'How to use Rust for AI',
        link: 'https://medium.com/@mimanshumaheshwari/how-to-use-rust-for-ai-a-comprehensive-guide-4ba5a6db3eb6',
        detail: 'A Comprehensive guide on implementing Gen AI with rust.',
        img: 'image/medium_logo.jpg',
      },
    ];
  }
}
