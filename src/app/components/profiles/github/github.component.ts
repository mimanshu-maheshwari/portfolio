import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GitRepos, GitUser } from '../../../models/github/git-user.model';
import { GithubService } from '../../../services/github.service';
import { first, firstValueFrom } from 'rxjs';

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
  protected userRepos!: Array<GitRepos>;
  // ngOnChanges(changes: SimpleChanges): void {
  async ngOnInit() {
    if (this.username) {
      this.userDetails = await firstValueFrom(
        this.githubService
          .getUserDetails(this.username)
          .pipe(takeUntilDestroyed(this.destroyRef)),
      );
      this.userRepos = await firstValueFrom(
        this.githubService
          .getUserRepos(this.username)
          .pipe(takeUntilDestroyed(this.destroyRef)),
      );
    }
  }
}
