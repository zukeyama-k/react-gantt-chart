import React, { useContext } from 'react';
import { Head, FlexRow } from './utilComponents';
import { HeadRowsDataType } from '../type/type';
import { Options } from '../react-gantt-chart';

export interface HeadRowsDataTypes {
  rows: HeadRowsDataType[];
}

const HeadRows: React.FC<HeadRowsDataTypes> = ({ rows }) => {
  const option = useContext(Options);

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
        {option.headTitle}
      </FlexRow>
      {rows.map((row: HeadRowsDataType, i: number) => (
        <FlexRow
          index={i + 1}
          key={i}
          style={{ padding: '5px 15px', fontSize: '20px', color: '#67ad95' }}
        >
          {row.name}
        </FlexRow>
      ))}
    </>
  );
};

export default HeadRows;
