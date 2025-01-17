import { NgModule } from '@angular/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatListModule,
    MatSidenavModule,
    MatChipsModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatCardModule,
    MatSliderModule,
    MatTabsModule,
    MatTooltipModule,
    MatBottomSheetModule,
  ],
  exports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatListModule,
    MatSidenavModule,
    MatChipsModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatCardModule,
    MatSliderModule,
    MatTabsModule,
    MatTooltipModule,
    MatBottomSheetModule,
  ],
})
export class MaterialModule {}
