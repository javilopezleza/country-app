import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interfaces';
import { map, Observable, catchError, throwError, delay } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';



@Injectable({
  providedIn: 'root'
})
export class CountryService {

  API_URL = 'https://restcountries.com/v3.1'

  private http = inject(HttpClient);

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();
    return this.http.get<RESTCountry[]>(`${this.API_URL}/capital/${query}`)
      .pipe(
        map(resp => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
        catchError(error =>{
          console.log(`Error fetching `, error);

          return throwError(() => new Error(`No se pudieron obtener países con el query: ${query}`));
        })
      );
  }

  searchByCountry(query: string): Observable<Country[]> {
    query = query.toLowerCase();
    return this.http.get<RESTCountry[]>(`${this.API_URL}/name/${query}`)
    .pipe(
      map(resp => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      delay(2000),
      catchError(error => {
        console.log(`Error fetching `, error);

        return throwError(() => new Error(`No se pudieron obtener países con el query: ${query}`));
      })
    )
  }
  searchCountryByAlphaCode(code: string){
    code = code.toLowerCase();
    return this.http.get<RESTCountry[]>(`${this.API_URL}/alpha/${code}`)
    .pipe(
      map(resp => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      map(countries => countries.at(0) ),
      catchError(error => {
        console.log(`Error fetching `, error);

        return throwError(() => new Error(`No se pudieron obtener países con el código: ${code}`));
      })
    )
  }
}
