import React, { useContext, useState } from 'react';
import { format as formatDate, differenceInCalendarDays } from 'date-fns';
import { CELLWIDTH, CHARTMARGIN } from '../config';
import Row from './Row';
import { HeadRowsDataType, Data } from '../type/type';
import { Options } from '../react-gantt-chart';

interface ScheduleType {
  width: string;
  left: string;
  backgroundColor: string;
  remark?: string
}

const Schedule:React.FC<ScheduleType> = ({ width, left, backgroundColor, remark = '' }) => {
  return (
    <div
      className="chart"
      data-remark={remark}
      style={{ position: 'absolute', top: '5px', left, width, height: '30px', borderRadius: '5px', backgroundColor, opacity: '0.7', boxSizing: 'border-box' }}
    >
    </div>
  )
}

interface RowsType {
  intervalDate: Date[];
  data: HeadRowsDataType[];
}

const Rows: React.FC<RowsType> = ({ intervalDate, data }) => {
  const [firstDay] = intervalDate;
  const context = useContext(Options) as any;
  const onShowTooltips = (e: any) :void => {
    if(e.target.className === 'chart' && e.target.dataset.remark) {
      context.tooltipRef.current.style.display = 'block';
      context.tooltipRef.current.style.left = (e.clientX + 20) + 'px';
      context.tooltipRef.current.style.top = (e.clientY - 20) + 'px';
      context.tooltipRef.current.textContent = e.target.dataset.remark;  
    } else {
      context.tooltipRef.current.style.display = 'none'; 
      context.tooltipRef.current.textContent = null;    
    }
  }
  return (
    <>
      {data.map((productsData: HeadRowsDataType, i: number) => {
        return (
          <div key={i} onMouseMove={onShowTooltips}>
            <Row
              key={i}
              data={intervalDate}
              isShowDay={false}
              width={`${intervalDate.length * CELLWIDTH}px`}
            >
              {productsData.data.map((sale: Data, i: number) => {
                const startDay = differenceInCalendarDays(sale.start, firstDay);
                const endDay = differenceInCalendarDays(sale.end, sale.start);
                const remark = sale.remark || '';
                return (
                  <Schedule
                    key={i}
                    width={`${endDay * CELLWIDTH}px`}
                    left={`${startDay * CELLWIDTH + CHARTMARGIN}px`}
                    backgroundColor={context.options.getChartColor(i)}
                    remark={remark}
                  >
                  </Schedule>
                );
              })}
            </Row>
          </div>
        );
      })}
    </>
  );
};

export default Rows;
