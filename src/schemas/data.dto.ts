export class DataEntry {
  No: number;
  Indikator: string;
  Unit: string;

  [key: string]: number | string;
}

export class DataRow {
  name: string;
  data: DataEntry[];
}

export class DataFinal {
  year: number;
  data: DataRow[];
}
