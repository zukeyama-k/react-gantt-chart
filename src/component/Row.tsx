import React, { useContext } from 'react';
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
  const context = useContext(Options);
  const localize = context.options.locale.localize as { day: (day: number, width: { width: string }) => string };

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
          const color = context.options.getDayColor(d);
          return (
            <Day
              key={i}
              style={{ height: isShowDay ? '50px' : '40px', background: color }}
            >
              {isShowDay && (
                <p>
                  {d.getDate()}
                  <br />
                  {localize.day(d.getDay(), { width: 'short' })}
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
