import React, { useContext } from 'react';
import { format as formatDate, differenceInCalendarDays } from 'date-fns';
import { CELLWIDTH, CHARTMARGIN } from '../config';
import { Schedule } from './utilComponents';
import Row from './Row';
import { HeadRowsDataType, Data } from '../type/type';
import { Options } from '../react-gantt-chart';

interface RowsType {
  intervalDate: Date[];
  data: HeadRowsDataType[];
}

const Rows: React.FC<RowsType> = ({ intervalDate, data }) => {
  const [firstDay] = intervalDate;
  const option = useContext(Options);

  return (
    <>
      {data.map((productsData: HeadRowsDataType, i: number) => {
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
                  backgroundColor={option.getChartColor(i)}
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
