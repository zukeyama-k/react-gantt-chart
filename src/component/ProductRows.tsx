import * as React from 'react';
import { Head, FlexRow } from './utilComponents';
import { ProductsDataType } from '../type/type';

export interface ProductRowsType {
  rows: ProductsDataType[];
}

const ProductRows: React.FC<ProductRowsType> = ({ rows }) => {
  return (
    <>
      <Head>&nbsp;</Head>
      <FlexRow
        style={{
          padding: '5px 15px',
          fontWeight: 'bold',
          fontSize: '13px',
          height: '50px',
        }}
      >
        商品
      </FlexRow>
      {rows.map((row: ProductsDataType, i: number) => (
        <FlexRow
          index={i + 1}
          key={i}
          style={{ padding: '5px 15px', fontSize: '20px', color: '#67ad95' }}
        >
          {row.productName}
        </FlexRow>
      ))}
    </>
  );
};

export default ProductRows;
