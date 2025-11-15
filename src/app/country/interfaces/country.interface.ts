import { Currency } from "./rest-countries.interfaces";

export interface Country {
  cca2: string;
  cioc: string | undefined;
  currency: { [key: string]: Currency };
  flag: string;
  flagSvg: string;
  name: string;
  capital: string;
  population: number;
  translations?: string;
  region: string;
  subregion: string;
}

