import { Component, inject, resource, signal } from '@angular/core';
import { SearchInput } from "../../components/search-input/search-input";
import { CountryList } from "../../components/country-list/country-list";
import { CountryService } from '../../services/country.service';
import { of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'by-country-page',
  imports: [SearchInput, CountryList],
  templateUrl: './by-country-page.html',
})
export class ByCountryPage {

  countryService = inject(CountryService);
  query = signal('');

    countryResource = rxResource<Country[], { query: string }>({
    params: () => ({ query: this.query() }),

    stream: ({ params }) => {
      if (!params.query) return of([]);
      return this.countryService.searchByCountry(params.query);
    }
  });


  // countryResource = resource({
  //   params: () => ({query: this.query()}),
  //   loader: async ({params}) => {
  //     if(!params.query) return [];

  //     return await firstValueFrom(
  //       this.CountryService.searchByCountry(params.query)
  //     )
  //   }
  // });
 }
