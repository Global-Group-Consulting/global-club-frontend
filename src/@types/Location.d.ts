export interface Region {
  _id: string;
  nome: string;
}

export interface Province {
  _id: string;
  nome: string;
  codice: string;
  sigla: string;
  regione: string;
}

export interface City {
  _id: string;
  nome: string;
  codice: string;
  regione: string;
  provincia: string;
  codiceCatastale: string;
  cap: string;
}
