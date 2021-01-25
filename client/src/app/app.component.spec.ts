import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {RouterOutlet} from '@angular/router';
import {NavbarComponent} from '../app/components/navbar/navbar.component';
import {FlashMessagesService} from 'angular2-flash-messages';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should create the dependencies', () => {
    const fixture_0 = TestBed.createComponent(RouterOutlet);
    const router = fixture_0.componentInstance;
    expect(router).toBeTruthy();
    const fixture_1 = TestBed.createComponent(NavbarComponent);
    const navbar = fixture_1.componentInstance;
    expect(navbar).toBeTruthy();
    const fixture_2 = TestBed.createComponent(FlashMessagesService);
    const messages = fixture_2.componentInstance;
    expect(messages).toBeTruthy();
  });

  it(`should have as title 'client'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('client');
  });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement;
  //   expect(compiled.querySelector('.content span').textContent).toContain('client app is running!');
  // });
});
