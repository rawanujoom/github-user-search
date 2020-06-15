import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpInterceptor} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {LoaderService} from './loader.service';
import {catchError, finalize, tap} from 'rxjs/operators';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
	
	pendingRequests = 0;

    constructor(private loaderService: LoaderService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (this.pendingRequests == 0) {
            this.loaderService.display(true);
        }
        this.pendingRequests++;

        return next.handle(req).pipe(
            tap((response) => {
                if (response instanceof HttpResponse) {
                    this.pendingRequests--;
                }
            }), catchError((HttpError: any) => {
                this.pendingRequests--;
                return throwError(HttpError);
            }), finalize(() => {
                if (this.pendingRequests == 0) {
                    this.loaderService.display(false);
                }
            }));
    }
}