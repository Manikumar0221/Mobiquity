import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsComponent implements OnInit {
  public forecastData$: Observable<any> | undefined;
  public ciytName: string;

  public day1PanelState = false;
  public day2PanelState = false;
  public day3PanelState = false;
  public day4PanelState = false;
  public day5PanelState = false;
  public step = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private weatherService: WeatherService,
    private router: Router
  ) {
    this.ciytName = '-';
  }

  /**
   * @description set the steps count
   * @param index number
   */
  public setStep(index: number): void {
    this.step = index;
  }

  /**
   * @description set the selected steps count
   */
  public nextStep(): void {
    this.step++;
  }

  /**
   * @description set the previous panel count
   */
  public prevStep(): void {
    this.step--;
  }

  ngOnInit(): void {
    // get the city name
    this.activatedRoute.paramMap.subscribe((url: any) => {
      this.ciytName = url.params.cityName
      this.getForecastData(url.params.cityName);
    });
  }

  /**
   * @description get the forecast data based on city name
   * @param cityName : string
   */
  private getForecastData(cityName: string): void {
    this.forecastData$ = this.weatherService.getForecastData(cityName);
  }

  /**
   * @description back to home
   */
  public onBackToHome() {
    this.router.navigate(['/home']);
  }

  /**
   * @description get the temperature
   * @param temperature : string
   */
  public getTemperature(temperature: string): string {
    return (parseFloat(temperature)-273.15).toFixed(0);
  }

  /**
   * @description get sea level meserument
   * @param pressure : string
   */
  public getSeaLevel(pressure: string): string {
    return (parseInt(pressure)*0.1).toFixed(2);
  }
}
