import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { NotFound } from "../../../shared/components/not-found/not-found";
import { SpinnerComponent } from "../../../shared/components/spinner/spinner.component";
import { CountryInformation } from "./country-information/country-information";

@Component({
  selector: 'country-page',
  imports: [NotFound, SpinnerComponent, CountryInformation],
  templateUrl: './country-page.html',
})
export class CountryPage {

  countryCode = inject(ActivatedRoute).snapshot.params['code'];
  countryService = inject(CountryService);


  countryResource = rxResource({
    params: () => ({code: this.countryCode}),
    stream:({params}) => {
      return this.countryService.searchCountryByAlphaCode(params.code);
    }
  });

 }
