import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SwUpdate } from '@angular/service-worker';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  constructor(private swUpdate: SwUpdate) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap((event) => {
        // Check if the response is an HTTP response
        if (event instanceof HttpResponse) {
          // Check for updates to the service worker
          this.swUpdate.checkForUpdate().then(() => {
            // If an update is available, activate the new version
            this.swUpdate.activateUpdate().then(() => {
              console.log('Service worker updated');
            });
          });
        }
      })
    );
  }
}
