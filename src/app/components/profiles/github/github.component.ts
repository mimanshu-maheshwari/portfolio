import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GitUser } from '../../../models/github/git-user.model';
import { GithubService } from '../../../services/github.service';

@Component({
  selector: 'app-github',
  standalone: false,

  templateUrl: './github.component.html',
  styleUrl: './github.component.scss',
})
export class GithubComponent implements OnInit {
  @Input() username!: string;
  private githubService: GithubService = inject(GithubService);
  private destroyRef: DestroyRef = inject(DestroyRef);
  protected userDetails!: GitUser;
  // ngOnChanges(changes: SimpleChanges): void {
  ngOnInit(): void {
    if (this.username) {
      this.githubService
        .getUserDetails(this.username)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (value) => {
            this.userDetails = value;
          },
        });
    }
  }
}
