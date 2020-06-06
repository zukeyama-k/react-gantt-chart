import React, { useContext } from 'react';
import { endOfMonth, format } from 'date-fns';
import { CELLWIDTH } from '../config';
import { Head } from './utilComponents';
import Row from './Row';
import { Options } from '../react-gantt-chart';

interface DaysType {
  days: { [key: number]: Date };
  data: Date[];
}

const Days: React.FC<DaysType> = ({ days, data }) => {
  const context = useContext(Options);

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: '1 1 auto' }}>
        <div style={{ display: 'flex' }}>
          {Object.entries(days).map(
            ([monthNum, month]: [string, Date], i: number) => {
              const width = endOfMonth(month).getDate() * CELLWIDTH;
              return (
                <Head
                  key={i}
                  style={{
                    textAlign: 'center',
                    borderRight: 'solid 1px #dedede',
                    width,
                  }}
                >
                {format(month, context.options.headFormat, { locale: context.options.locale})}
                </Head>
              );
            }
          )}
        </div>
        <Row data={data} width={`${data.length * CELLWIDTH}px`} />
      </div>
    </div>
  );
};
export default Days;
