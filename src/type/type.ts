export type Data = { start: Date; end: Date };

export interface ProductsDataType {
  productName?: string;
  data: Data[];
}

export interface RowType {
  d: Date[];
  isValue?: boolean;
  w?: string;
}

export interface RootProps {
  data: ProductsDataType[];
  option: { showMonth: number };
}
