import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export class Utilities{

    static getEmailPattern(): RegExp
    {
        return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/
    }

    static isNullOrWhiteSpace(str): boolean{
      if(str === null) return true;

      return str.replace(/\s/g, '').length < 1
    }

    static handleHttpError(error: HttpErrorResponse){
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
              `Backend returned code ${error.status}, ` +
              `body was: ${error.error}`);
          }
          // return an observable with a user-facing error message
          return throwError(
            'Something bad happened; please try again later.');
    }
}