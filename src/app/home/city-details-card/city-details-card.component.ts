import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-city-details-card',
  templateUrl: './city-details-card.component.html',
  styleUrls: ['./city-details-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CityDetailsCardComponent implements OnInit, OnChanges {
  @Input() cardDetails: any;
  public cityName: string;
  public temperature: string;
  public sunriseTime: string;
  public sunSetTime: string;

  constructor(private router: Router) {
    this.cityName = '-';
    this.temperature = '0';
    this.sunriseTime = '-';
    this.sunSetTime = '-';
  }

  ngOnInit(): void {
  }

  /**
   * @description unixtime to date convertion
   * @param time : number
   */
  private dataConvertion(time: number): string {
    const unixTime = time;
    const date = new Date(unixTime*1000);
    return (date.toLocaleString("eu-US", {timeZone: `Europe/${this.cityName}`, hour: '2-digit', minute: '2-digit'}));
  }

  /**
   * @description click to navigation page
   */
  public onClickDetails(): void {
    this.router.navigate([`/details/${this.cityName}`]);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.cardDetails.currentValue) {
      const data = changes.cardDetails.currentValue
      this.cityName = data.name;
      this.temperature = (parseFloat(data.main.temp_max)-273.15).toFixed(0);
      this.sunSetTime = this.dataConvertion(data.sys.sunset);
      this.sunriseTime = this.dataConvertion(data.sys.sunrise);
    }
  }
}
