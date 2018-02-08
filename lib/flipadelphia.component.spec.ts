import { async, ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import { FlipadelphiaComponent } from './flipadelphia.component';
import { ToggleState } from './toggle-state';

describe('FlipadelphiaComponent', () => {
  let component: FlipadelphiaComponent;
  let fixture: ComponentFixture<FlipadelphiaComponent>;

  getTestBed().initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting()
  );

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlipadelphiaComponent ]
    })
    .compileComponents()
    .then(() => {
      ToggleState['foo'] = true;
      ToggleState['bar'] = false;
      ToggleState['bizz'] = true;
      ToggleState['buzz'] = false;
      ToggleState['bazz'] = true;
      fixture = TestBed.createComponent(FlipadelphiaComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should create a checkbox for each feature toggle', () => {
    const checkboxes = fixture.debugElement.queryAll(By.css('input[type=checkbox]'));
    expect(checkboxes.length).toBe(5);
  });

  it('should have active feature toggles checked', () => {
    const checkboxes = fixture.debugElement.queryAll(By.css('input[type=checkbox]'));
    expect(checkboxes.filter((c) => c.nativeElement.checked).length).toBe(3);
  });

  it('should not have inactive feature toggles checked', () => {
    const checkboxes = fixture.debugElement.queryAll(By.css('input[type=checkbox]'));
    expect(checkboxes.filter((c) => !c.nativeElement.checked).length).toBe(2);
  });

  it('should update the toggle state to true when you check one', () => {
    const unchecked = fixture.debugElement.query(By.css('#bar'));
    unchecked.nativeElement.click();
    fixture.detectChanges();
    expect(ToggleState['bar']).toBe(true);
  });

  it('should update the toggle state to false when you uncheck one', () => {
    const checked = fixture.debugElement.query(By.css('#foo'));
    checked.nativeElement.click();
    fixture.detectChanges();
    expect(ToggleState['foo']).toBe(false);
  });
});
