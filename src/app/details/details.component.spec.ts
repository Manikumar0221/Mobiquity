import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { WeatherService } from '../weather.service';

import { DetailsComponent } from './details.component';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let weatherservice: WeatherService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsComponent ],
      imports: [MatButtonModule, RouterTestingModule, HttpClientModule],
      providers: [WeatherService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    weatherservice = TestBed.inject(WeatherService);
    spyOn(weatherservice, 'getForecastData').and.returnValue(of({
      list: [
        {
          "temp":{
            "day":293.79,
            "min":288.85,
            "max":294.47,
            "night":288.85,
            "eve":290.44,
            "morn":293.79
         },
         "pressure":1025.04,
        }
      ]
    }));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check the Temperature & Pressure', () => {
    expect(component.getSeaLevel('1025.04')).toBe('102.50');
    expect(component.getTemperature('293.79')).toBe('21');
  });

  it('check with panel selection', () => {
      expect(component.step).toBe(0);

      component.setStep(1);
      expect(component.step).toBe(1);

      component.nextStep();
      expect(component.step).toBe(2);

      component.prevStep();
      expect(component.step).toBe(1);
  });

  it('check the back to home button click', () => {
    const compiled = fixture.nativeElement;
    compiled.querySelector('.mat-stroked-button').click();
    expect(compiled.querySelector('.mat-stroked-button').textContent).toContain('Back to home');    
  });
});
