import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA, SimpleChange, SimpleChanges } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { WeatherService } from 'src/app/weather.service';

import { CityDetailsCardComponent } from './city-details-card.component';

describe('CityDetailsCardComponent', () => {
  let component: CityDetailsCardComponent;
  let fixture: ComponentFixture<CityDetailsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CityDetailsCardComponent ],
      providers: [WeatherService],
      imports: [HttpClientModule, RouterTestingModule],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CityDetailsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check for onchanges without data', () => {
    component.ngOnChanges({
      cardDetails: new SimpleChange(null, null, true)
    });
    expect(component.cityName).toBe('-');
  });

  it('check for onchanges with data', () => {
    const data = {
      "main": {
        "temp": 282.55,
        "feels_like": 281.86,
        "temp_min": 280.37,
        "temp_max": 284.26,
        "pressure": 1023,
        "humidity": 100
      },
      "sys": {
        "sunrise": 1560343627,
        "sunset": 1560396563
      },
      "name": "Paris",
    }

    component.ngOnChanges({
      cardDetails: new SimpleChange(null, data, true)
    });
    expect(component.temperature).toBe('11');
    expect(component.sunSetTime).toBe('05:29 AM');
    expect(component.sunriseTime).toBe('02:47 PM');
    const compiled = fixture.nativeElement;
    compiled.querySelector('.city-name').click();
    expect(component.cityName).toBe('Paris'); 
  });
});
