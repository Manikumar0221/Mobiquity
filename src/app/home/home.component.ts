import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  public istanbulData$: Observable<any> | undefined;
  public moscowData$: Observable<any> | undefined;
  public londonData$: Observable<any> | undefined;
  public berlinData$: Observable<any> | undefined;
  public parisData$: Observable<any> | undefined;

  constructor(private weatherservice: WeatherService) { }

  ngOnInit(): void {
    this.istanbulData$ = this.weatherservice.getWeatherData('Istanbul');
    this.moscowData$ = this.weatherservice.getWeatherData('Moscow');
    this.londonData$ = this.weatherservice.getWeatherData('London');
    this.berlinData$ = this.weatherservice.getWeatherData('Berlin');
    this.parisData$ = this.weatherservice.getWeatherData('Paris');
  }
}
