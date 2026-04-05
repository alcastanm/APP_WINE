import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { provideHttpClient,withInterceptors  } from '@angular/common/http';
import { authInterceptor } from './app/CORE/interceptors/auth-interceptor'
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { addIcons } from 'ionicons';
import { star, starOutline, camera, image,folder,libraryOutline,wineOutline   } from 'ionicons/icons';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideLottieOptions } from 'ngx-lottie';
import player from 'lottie-web';
import { isDevMode } from '@angular/core';
import { provideServiceWorker } from '@angular/service-worker';

addIcons({
  star,
  'star-outline': starOutline,
  'wine-catalog':libraryOutline ,
  'wine-note':wineOutline,
  camera,
  image,
  folder 
});

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimationsAsync(),
    provideLottieOptions({
      player: () => player
    }), provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          })
  ],
});
