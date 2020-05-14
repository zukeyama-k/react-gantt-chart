import * as React from 'react';
import { format as formatDate, differenceInCalendarDays } from 'date-fns';
import { CELLWIDTH, CHARTMARGIN } from '../config';
import { getChartColor } from '../util';
import { Schedule } from './utilComponents';
import Row from './Row';
import { ProductsDataType, Data } from '../type/type';

interface RowsType {
  intervalDate: Date[];
  data: ProductsDataType[];
}

const Rows: React.FC<RowsType> = ({ intervalDate, data }) => {
  const [firstDay] = intervalDate;
  return (
    <>
      {data.map((productsData: ProductsDataType, i: number) => {
        return (
          <Row
            key={i}
            data={intervalDate}
            isShowDay={false}
            width={`${intervalDate.length * CELLWIDTH}px`}
          >
            {productsData.data.map((sale: Data, i: number) => {
              const startDay = differenceInCalendarDays(sale.start, firstDay);
              const endDay = differenceInCalendarDays(sale.end, sale.start);
              return (
                <Schedule
                  key={i}
                  width={`${endDay * CELLWIDTH}px`}
                  left={`${startDay * CELLWIDTH + CHARTMARGIN}px`}
                  backgroundColor={getChartColor(i)}
                >
                  <span
                    style={{
                      padding: '3px 10px',
                      display: 'block',
                      color: '#000',
                    }}
                  >{`${formatDate(sale.start, 'yyyy/MM/dd')}〜${formatDate(
                    sale.end,
                    'yyyy/MM/dd'
                  )}`}</span>
                </Schedule>
              );
            })}
          </Row>
        );
      })}
    </>
  );
};

export default Rows;
