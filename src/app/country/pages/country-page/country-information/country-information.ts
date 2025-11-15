import { Component, computed, inject, input } from '@angular/core';
import { Country } from '../../../interfaces/country.interface';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'country-information',
  imports: [DecimalPipe],
  templateUrl: './country-information.html',
})
export class CountryInformation {
  country = input.required<Country>();

  get currencyName(): string {
    return Object.values(this.country().currency)[0]?.name || 'N/A';
  }

  get currencySymbol(): string {
    return Object.values(this.country().currency)[0]?.symbol || '';
  }


  currentYear = computed(() => {
    return new Date().getFullYear();
  })

}
