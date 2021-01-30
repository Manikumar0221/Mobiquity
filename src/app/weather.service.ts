import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private readonly apiKey: string = '3d8b309701a13f65b660fa2c64cdc517';
  private readonly hostname: string = 'http://api.openweathermap.org/data/2.5';
  private readonly iterations: number = 5;

  constructor(private http: HttpClient) { }

  public getWeatherData(cityName: string): Observable<object> {
    const url = `${this.hostname}/weather?q=${cityName}&appid=${this.apiKey}`;
    return this.http.get(url);
  }

  public getForecastData(cityName: string): Observable<object> {
    const url = `${this.hostname}/forecast/daily?q=${cityName}&cnt=${this.iterations}&appid=${this.apiKey}`;
    return this.http.get(url);
  }
}
