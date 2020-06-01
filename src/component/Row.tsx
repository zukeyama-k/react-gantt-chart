import React, { useContext } from 'react';
import { getDayColor } from '../util';
import { FlexRow, Day } from './utilComponents';
import { Options } from '../react-gantt-chart';

interface RowType {
  data: Date[];
  isShowDay?: boolean;
  width?: string;
}

const Row: React.FC<RowType> = ({
  data,
  isShowDay = true,
  width,
  children,
}) => {

  const o = useContext(Options);

  return (
    <FlexRow
      style={{
        width: width,
        position: 'relative',
        overflow: 'hidden',
        height: isShowDay ? '50px' : '40px',
      }}
    >
      <div style={{ display: 'flex', height: '100%', alignItems: 'center' }}>
        {data.map((d: Date, i: number) => {
          const color = getDayColor(d, o.isHoliday, o.DAY_COLOR);
          return (
            <Day
              key={i}
              style={{ height: isShowDay ? '50px' : '40px', background: color }}
            >
              {isShowDay && (
                <p>
                  {d.getDate()}
                  <br />
                  {o.WEEK_JA[d.getDay()]}
                </p>
              )}
            </Day>
          );
        })}
      </div>
      {children}
    </FlexRow>
  );
};

export default Row;
