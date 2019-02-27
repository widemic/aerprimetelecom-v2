import { ChangeDetectorRef, Component, ViewChild, OnDestroy} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import {MatSidenav} from '@angular/material/sidenav';
import {MediaMatcher} from '@angular/cdk/layout';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnDestroy{

  mobileQuery: MediaQueryList;

  @ViewChild('drawer') drawer: MatSidenav;

  clickedCircle( index: number) {
    this.drawer.toggle();
    console.log(`clicked the circle: ${index}`)
  }

  name: string = 'My first AGM project';
  lat: number = 44.482961;
  lng: number = 26.122129;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

    private _mobileQueryListener: () => void;

  constructor(private breakpointObserver: BreakpointObserver, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}