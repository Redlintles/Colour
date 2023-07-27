import { Data, dataPT, dataEN } from "data/PageText";

export interface Language {
  acronym: string;
  language: string;
  data: Data;
}

export const supportedLanguages: Array<Language> = [
  {
    acronym: "PT",
    language: "Português",
    data: dataPT,
  },
  {
    acronym: "EN",
    language: "English",
    data: dataEN,
  },
];
