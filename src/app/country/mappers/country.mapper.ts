import type { Country } from '../interfaces/country.interface';
import type { RESTCountry } from '../interfaces/rest-countries.interfaces';

export class CountryMapper {

  // static RESTCountry => Country
  static mapRestCountryToCountry(restCountry: RESTCountry): Country {
    return {
      capital: restCountry.capital.join(','),
      cca2: restCountry.cca2,
      currency: restCountry.currencies,
      cioc: restCountry.cioc,
      flag: restCountry.flag,
      flagSvg: restCountry.flags.svg,
      name: restCountry.translations['spa'].common ?? 'No spanish Name',
      population: restCountry.population,
      region: restCountry.region,
      subregion: restCountry.subregion,
    }
  }

  // static RESTCountry[] => Country[]
  static mapRestCountryArrayToCountryArray(
    restCountries: RESTCountry[]
  ): Country[] {
    return restCountries.map(this.mapRestCountryToCountry);
  }

}

