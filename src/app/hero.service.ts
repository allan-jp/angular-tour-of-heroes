import { Injectable } from '@angular/core';
import { Hero } from './hero';
//import { HEROES } from './mock-heroes';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  header: new HttpHeaders({ 'Content-Type': 'application/json' })
} 

@Injectable() //This service MIGHT itself have injected dependencies, good practice to keep this decorator
export class HeroService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  private heroesUrl = 'api/heroes'; //URL to web api

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(heroes => this.log(`fetched heroes1`)),
        catchError(this.handleError('getHeroes', []))
      );
  }

  // Will 404 if id not found
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetch hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    )
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }

  /* Handle http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T){
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); //log to console

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result
      return of(result as T);
    };
  }
}
