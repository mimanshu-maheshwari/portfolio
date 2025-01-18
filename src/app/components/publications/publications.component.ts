import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Publication } from '../../models/about-me.model';
import { AboutService } from '../../services/about.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-publications',
  standalone: false,

  templateUrl: './publications.component.html',
  styleUrl: './publications.component.scss',
})
export class PublicationsComponent implements OnInit {
  publications!: Array<Publication>;
  private aboutService: AboutService = inject(AboutService);
  private destroyRef: DestroyRef = inject(DestroyRef);
  ngOnInit(): void {
    this.aboutService.aboutMe$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (val) => {
          if (val?.publications) {
            this.publications = val.publications;
          }
        },
      });
  }
}
