import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GaugesModule } from '@progress/kendo-angular-gauges';
import { ChartsModule } from '@progress/kendo-angular-charts';
import 'hammerjs';
import { NavbarComponent } from './navbar/navbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatCard, MatCardModule, MatGridListModule } from '@angular/material';
import { AgmCoreModule } from '@agm/core';
import { SensorDataService } from './sensor-data.service'
import { HttpClientModule } from '@angular/common/http';
import { DetailsComponent } from './details/details.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    GaugesModule,
    ChartsModule,
    LayoutModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDPK_-zCqhlzD1Rtg-JXj9yKoHa2JInOkw'
    }),
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    HttpClientModule,
    MatCardModule,
    MatGridListModule,
  ],
  providers: [SensorDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
