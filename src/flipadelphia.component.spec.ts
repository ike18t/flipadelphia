import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Mock } from 'ts-mocks';
import { FEATURE_TOGGLES } from './feature-toggles';
import { FlipadelphiaComponent } from './flipadelphia.component';
import { FLIPPER_SERVICE, FlipperService } from './flipper-service';

describe('FlipadelphiaComponent', () => {
  let fixture: ComponentFixture<FlipadelphiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlipadelphiaComponent ],
      providers: [
        { provide: FEATURE_TOGGLES,
          useValue: { bar: false,
                      bazz: true,
                      bizz: true,
                      buzz: false,
                      foo: true }
        },
        { provide: FLIPPER_SERVICE,
          useValue: new Mock<FlipperService>({ disable: Mock.ANY_FUNC,
                                               enable: Mock.ANY_FUNC,
                                               isEnabled: () => false }).Object }
      ]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(FlipadelphiaComponent);
      fixture.detectChanges();
    });
  }));

  it('should create a checkbox for each feature toggle', () => {
    const checkboxes = fixture.debugElement.queryAll(By.css('input[type=checkbox]'));
    expect(checkboxes.length).toBe(5);
  });

  it('should have active feature toggles checked', () => {
    const checkboxes = fixture.debugElement.queryAll(By.css('input[type=checkbox]:checked'));
    expect(checkboxes.length).toBe(3);
  });

  it('should not have inactive feature toggles checked', () => {
    const checkboxes = fixture.debugElement.queryAll(By.css('input[type=checkbox]:not(:checked)'));
    expect(checkboxes.length).toBe(2);
  });

  it('should call enable on the service when you check a toggle', () => {
    const unchecked = fixture.debugElement.query(By.css('#bar'));
    unchecked.nativeElement.click();
    fixture.detectChanges();
    expect(TestBed.get(FLIPPER_SERVICE).enable).toHaveBeenCalledWith('bar');
  });

  it('should update the toggle state to false when you uncheck one', () => {
    const checked = fixture.debugElement.query(By.css('#foo'));
    checked.nativeElement.click();
    fixture.detectChanges();
    expect(TestBed.get(FLIPPER_SERVICE).disable).toHaveBeenCalledWith('foo');
  });
});
