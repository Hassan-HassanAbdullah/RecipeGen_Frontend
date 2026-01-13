import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(
    routes,
    withInMemoryScrolling({
      scrollPositionRestoration: 'enabled', // 👈 ye 'top' ke barabar hai
      anchorScrolling: 'enabled',           
    })
  ),  provideHttpClient()],

};
