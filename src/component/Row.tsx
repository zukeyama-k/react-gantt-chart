import * as React from 'react';
import { WEEK_JA } from '../config';
import { getDayColor } from '../util';
import { FlexRow, Day } from './utilComponents';

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
          const color = getDayColor(d);
          return (
            <Day
              key={i}
              style={{ height: isShowDay ? '50px' : '40px', background: color }}
            >
              {isShowDay && (
                <p>
                  {d.getDate()}
                  <br />
                  {WEEK_JA[d.getDay()]}
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
