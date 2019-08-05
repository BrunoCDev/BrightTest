export interface IResult {
  name: string;
  values: IValue[];
  total: IMetric[];
}

export interface IValue {
  date: string;
  metrics: IMetric[];
}

export interface IMetric {
  id: string;
  value: number;
}

export interface ILabels {
  dates: string[];
  names: string[];
}
