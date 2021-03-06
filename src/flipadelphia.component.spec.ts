import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Mock } from 'ts-mocks';
import { FlipadelphiaComponent } from './flipadelphia.component';
import { FlipperService } from './flipper.service';
import { TestFlipadelphia } from './test-fixtures';

describe('FlipadelphiaComponent', () => {
  let fixture: ComponentFixture<FlipadelphiaComponent>;
  let componentInstance: FlipadelphiaComponent;
  let mockFlipperService: FlipperService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlipadelphiaComponent ]
    })
    .compileComponents()
    .then(() => {
      mockFlipperService = new Mock<FlipperService>({ disable: Mock.ANY_FUNC,
                                                      enable: Mock.ANY_FUNC,
                                                      isEnabled: () => true }).Object;
      fixture = TestBed.createComponent(FlipadelphiaComponent);
      componentInstance = fixture.componentInstance;
      componentInstance.flipadelphia = new TestFlipadelphia(mockFlipperService);
      fixture.detectChanges();
    });
  }));

  it('should create a checkbox for each feature toggle', () => {
    const checkboxes = fixture.debugElement.queryAll(By.css('input[type=checkbox]'));
    expect(checkboxes.length).toBe(5);
  });

  it('should have active feature toggles checked', () => {
    new Mock<FlipperService>(mockFlipperService).extend({ isEnabled: () => true });
    fixture.detectChanges();
    const checkboxes = fixture.debugElement.queryAll(By.css('input[type=checkbox]:checked'));
    expect(checkboxes.length).toBe(5);
  });

  it('should not have inactive feature toggles checked', () => {
    new Mock<FlipperService>(mockFlipperService).extend({ isEnabled: () => false });
    fixture.detectChanges();
    const checkboxes = fixture.debugElement.queryAll(By.css('input[type=checkbox]:not(:checked)'));
    expect(checkboxes.length).toBe(5);
  });

  it('should call enable on the service when you check a disabled toggle', () => {
    new Mock<FlipperService>(mockFlipperService).extend({ isEnabled: () => false });
    fixture.detectChanges();
    const unchecked = fixture.debugElement.query(By.css('#bar'));
    unchecked.nativeElement.click();
    fixture.detectChanges();
    expect(mockFlipperService.enable).toHaveBeenCalledWith('bar');
  });

  it('should call disable on the service when you check a enabled toggle', () => {
    new Mock<FlipperService>(mockFlipperService).extend({ isEnabled: () => true });
    fixture.detectChanges();
    const checked = fixture.debugElement.query(By.css('#bar'));
    checked.nativeElement.click();
    fixture.detectChanges();
    expect(mockFlipperService.disable).toHaveBeenCalledWith('bar');
  });

  it('should update the toggle state to false when you uncheck one', () => {
    const checked = fixture.debugElement.query(By.css('#bar'));
    checked.nativeElement.click(); // Disable
    fixture.detectChanges();
    expect(mockFlipperService.disable).toHaveBeenCalledWith('bar');
  });
});
