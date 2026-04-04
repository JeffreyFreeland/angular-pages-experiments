import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {environment} from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { isDevMode } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('angular-experiments');
  protected somevar = 'TEST';
  protected envVar = environment.MY_ENV_VAR;
  protected devMode = isDevMode();
  private http = inject(HttpClient);

  ngOnInit() {
    if(isDevMode()){
      const DEV_AUTH_CALLBACK_URL = 'http://localhost:5006/auth-callback';
      (window as any).handleCredentialResponse = (response: any) => {
        this.http.post(
          DEV_AUTH_CALLBACK_URL, 
          { credential: response.credential }
        ).subscribe();
      };
    }
  }
}
