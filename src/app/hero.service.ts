import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { Hero } from './heroes/hero.model';
import { MessagesService } from './messages.service';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor(
    private messagesService: MessagesService,
    private http: HttpClient
  ) {}

  public httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  public getAllHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>('api/heroes').pipe(
      tap((_) => this.log('fetched heroes')),
      catchError((err) => {
        return throwError(() => new Error(err));
      })
    );
  }

  public getHero(id: number): Observable<Hero> {
    return this.http.get<Hero>('api/heroes/' + id).pipe(
      tap((_) => this.log('fetched a hero with id: ' + id)),
      catchError((err) => {
        return throwError(() => new Error(err));
      })
    );
  }

  public updateHero(hero: Hero): Observable<any> {
    return this.http.put('api/heroes', hero, this.httpOptions).pipe(
      tap((_) => this.log('updated a hero with id: ' + hero.id)),
      catchError((err) => {
        return throwError(() => new Error(err));
      })
    );
  }

  public addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>('api/heroes', hero, this.httpOptions).pipe(
      tap((_) => this.log('created a hero with id: ' + hero.id)),
      catchError((err) => {
        return throwError(() => new Error(err));
      })
    );
  }

  public deleteHero(id: number): Observable<Hero> {
    return this.http.delete<Hero>('api/heroes/' + id, this.httpOptions).pipe(
      tap((_) => this.log('deleted a hero with id: ' + id)),
      catchError((err) => {
        return throwError(() => new Error(err));
      })
    );
  }

  public searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }

    return this.http.get<Hero[]>(`api/heroes/?name=${term}`).pipe(
      tap((x) =>
        x.length
          ? this.log(`found heroes matching "${term}"`)
          : this.log(`no heroes matching "${term}"`)
      ),
      catchError((err) => {
        return throwError(() => new Error(err));
      })
    );
  }

  private log(message: string) {
    this.messagesService.addMessage(`HeroService: ${message}`);
  }
}
