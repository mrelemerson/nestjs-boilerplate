export enum FilterOperator {
  EQ = 'eq',
  NE = 'ne',
  GT = 'gt',
  GTE = 'gte',
  LT = 'lt',
  LTE = 'lte',
  IN = 'in',
  EXISTS = 'exists',
}

export enum OrderType {
  ASC = 'asc',
  DESC = 'desc',
}

type Filter = {
  field: string;
  operator: FilterOperator;
  value: unknown;
};

type Order = {
  by: string;
  type: OrderType;
};

export class CriteriaDto {
  fields?: string[];
  filters?: Filter[];
  orders?: Order[];
  page?: number;
  size?: number;
}
