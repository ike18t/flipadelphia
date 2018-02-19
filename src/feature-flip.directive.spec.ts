import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Mock } from 'ts-mocks';
import { FeatureFlipDirective } from './feature-flip.directive';
import { FLIPPER_SERVICE, FlipperService } from './flipper.service';

@Component({
  selector: 'example-component-container',
  template: `
    <div [feature-flip]="'foo'">'hi'</div>
  `
})
class ExampleComponentContainer {}

describe('FeatureFlip', () => {
  let fixture: ComponentFixture<ExampleComponentContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ExampleComponentContainer,
        FeatureFlipDirective
      ],
      providers: [
        { provide: FLIPPER_SERVICE,
          useValue: new Mock<FlipperService>({ disable: Mock.ANY_FUNC,
                                               enable: Mock.ANY_FUNC,
                                               isEnabled: () => Promise.resolve(false) }).Object },
        // { provide: TemplateRef, useValue: new Mock<TemplateRef<any>>().Object },
        // { provide: ViewContainerRef, useValue: new Mock<ViewContainerRef>({ clear: Mock.ANY_FUNC }).Object }
      ]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(ExampleComponentContainer);
      fixture.detectChanges();
    });
  }));

  xit('does not render the element that has the directive if the toggle value is false', () => {
    const debugElement = fixture.debugElement.query(By.css('div'));
    expect(debugElement).toBeNull();
  });
});
