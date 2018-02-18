import { InjectionToken, ModuleWithProviders, NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlipadelphiaComponent } from './flipadelphia.component';
import { FEATURE_TOGGLES, FeatureToggles } from './feature-toggles';
import { FLIPPER_SERVICE, FlipperService } from './flipper-service';
import { LOCAL_STORAGE, LocalStorageFlipperService } from './local-storage-flipper-service';

@NgModule({
  declarations: [
    FlipadelphiaComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FlipadelphiaComponent
  ]
})
export class FlipadelphiaModule {
  static forRoot(featureToggles: FeatureToggles, flipperService: Type<FlipperService> = LocalStorageFlipperService): ModuleWithProviders {
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
