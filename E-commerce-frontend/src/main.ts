import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { provideHttpClient, HTTP_INTERCEPTORS, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptor } from './app/_auth/auth.interceptor';
import { UserService } from './app/_services/user.service';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()), // enables DI for interceptors
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, UserService
  ]
});
