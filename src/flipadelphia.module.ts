import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Type } from '@angular/core';
import { FeatureFlipDirective } from './feature-flip.directive';
import { FEATURE_TOGGLES, FeatureToggles } from './feature-toggles';
import { FlipadelphiaComponent } from './flipadelphia.component';
import { FLIPPER_SERVICE, FlipperService } from './flipper.service';
import { LOCAL_STORAGE, LocalStorageFlipperService } from './local-storage-flipper.service';

@NgModule({
  declarations: [
    FeatureFlipDirective,
    FlipadelphiaComponent
  ],
  entryComponents: [
    FlipadelphiaComponent
  ],
  exports: [
    FeatureFlipDirective,
    FlipadelphiaComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    LocalStorageFlipperService
  ]
})
export class FlipadelphiaModule {
  static forRoot(featureToggles: FeatureToggles,
                 flipperService: Type<FlipperService> = LocalStorageFlipperService): ModuleWithProviders {
    return {
      ngModule: FlipadelphiaModule,
      providers: [
        { provide: FEATURE_TOGGLES, useValue: featureToggles },
        { provide: FLIPPER_SERVICE, useClass: flipperService },
        { provide: LOCAL_STORAGE, useValue: window.localStorage }
      ]
    };
  }
}
