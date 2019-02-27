import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SensorDataService } from '../sensor-data.service'
import { SensorDataModel } from '../SensorDataModel'
import { Observable } from 'rxjs/Observable';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MediaMatcher } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  mobileQuery: MediaQueryList;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  private _mobileQueryListener: () => void;

  constructor(private breakpointObserver: BreakpointObserver, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private sensordataservice: SensorDataService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  public sensorsdata: SensorDataModel[];
  chartsensordata: SensorDataModel[];
  public CO2_array: any[] = [];
  public CO_array: any[] = [];
  public TEMP_array: any[] = [];
  public HUM_array: any[] = [];
  public PRESS_array: any[] = [];
  public O3_array: any[] = [];
  public NO_array: any[] = [];
  public NO2_array: any[] = [];
  public SO2_array: any[] = [];
  public CO_index: number = 0.874;
  public PRESS_mmhg: number;


  /* !!important !! GENEREAZA SVG AICI */
  ngOnInit() {
    var sum = 0;
    this.sensordataservice.getLastSensorData().subscribe((data: SensorDataModel[]) => {
      this.sensorsdata = data;
      this.sensorsdata.map(item => {
        this.PRESS_mmhg = parseInt((item.press * 0.00750061683).toFixed(0));
      })
    })

    this.sensordataservice.getLastLimitSensorData(24).subscribe((data: SensorDataModel[]) => {
      this.chartsensordata = data;
      this.chartsensordata.map(item => {
        this.CO2_array.push(item.CO2);
        this.CO_array.push(item.CO);
        this.TEMP_array.push(item.temp);
        this.HUM_array.push(item.hum);
        this.PRESS_array.push(item.press);
        this.O3_array.push(item.O3);
        this.NO_array.push(item.NO);
        this.NO2_array.push(item.NO2);
        this.SO2_array.push(item.SO2);
      })
      this.CO_array.reverse();
      this.CO2_array.reverse();
      this.NO2_array.reverse();
      this.NO_array.reverse();
      this.SO2_array.reverse();
      this.TEMP_array.reverse();
      this.HUM_array.reverse();
      this.PRESS_array.reverse();
      this.O3_array.reverse();

      //console.log(this.CO2_array);
    })
    /*--------Console debuging--------*/
    // for(var i=0; i < 8; i++){
    //   this.CO_index = this.CO_index + parseFloat(this.CO_array[i]);
    //   console.log(this.CO_array[i]);
    // }
    // this.CO_index = this.CO_index / 8;
    // console.log(this.CO_index);



    if (this.CO_index >= 0.0 || this.CO_index <= 4.4) {
      var C_low: number = 0.0;
      var C_high: number = 4.4;
      var I_low: number = 0;
      var I_high: number = 50;
      this.CO_index = parseFloat((((I_high - I_low) / (C_high - C_low)) * (this.CO_index - C_low) + I_low).toPrecision(1));
    }
    else if (this.CO_index >= 4.5 || this.CO_index <= 9.4) {
      var C_low: number = 4.5;
      var C_high: number = 9.4;
      var I_low: number = 51;
      var I_high: number = 100;
      this.CO_index = ((I_high - I_low) / (C_high - C_low)) * (this.CO_index - C_low) + I_low
    }
    else if (this.CO_index >= 12.5 || this.CO_index <= 15.4) {
      var C_low = 9.5;
      var C_high = 12.4;
      var I_low = 101;
      var I_high = 150;
      this.CO_index = ((I_high - I_low) / (C_high - C_low)) * (this.CO_index - C_low) + I_low
    }
    else if (this.CO_index >= 0.0 || this.CO_index <= 4.4) {
      var C_low = 12.5;
      var C_high = 15.4;
      var I_low = 151;
      var I_high = 200;
      this.CO_index = ((I_high - I_low) / (C_high - C_low)) * (this.CO_index - C_low) + I_low
    }
    console.log(this.CO_index);
  }


  public CO2_colors: any[] = [{
    to: 250,
    color: 'green'
  }, {
    from: 251,
    to: 350,
    color: 'yellow'
  }, {
    from: 351,
    to: 450,
    color: 'orange'
  }, {
    from: 500,
    color: 'red'
  }];

  public CO_colors: any[] = [{
    to: 4.4,
    color: 'green'
  }, {
    from: 4.5,
    to: 9.4,
    color: 'yellow'
  }, {
    from: 9.5,
    to: 12.4,
    color: 'orange'
  }, {
    from: 12.5,
    color: 'red'
  }];

  public NO2_colors: any[] = [{
    to: 0.053,
    color: 'green'
  }, {
    from: 0.054,
    to: 0.1,
    color: 'yellow'
  }, {
    from: 0.101,
    to: 0.360,
    color: 'orange'
  }, {
    from: 0.361,
    color: 'red'
  }];

  public SO2_colors: any[] = [{
    to: 0.035,
    color: 'green'
  }, {
    from: 0.036,
    to: 0.075,
    color: 'yellow'
  }, {
    from: 0.076,
    to: 0.185,
    color: 'orange'
  }, {
    from: 0.186,
    color: 'red'
  }];

  public pieData: any[] = [1, 2, 3];
  public bulletData: any[] = [0, 1000];
  public bulletValueAxis: any = {
    min: 0,
    max: 1000,
    plotBands: [{
      from: 0, to: 300, color: "#00FF00", opacity: 0.15
    }, {
      from: 301, to: 500, color: "#FFBF00", opacity: 0.3
    }, {
      from: 501, to: 1000, color: "#FF0000", opacity: 0.15
    }]
  };
}
