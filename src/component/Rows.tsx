import React, { useContext, useState } from 'react';
import { format as formatDate, differenceInCalendarDays } from 'date-fns';
import { CELLWIDTH, CHARTMARGIN } from '../config';
import Row from './Row';
import { HeadRowsDataType, Data } from '../type/type';
import { Options } from '../react-gantt-chart';

const pointerMargin = 20;

interface ScheduleType {
  width: string;
  left: string;
  remark?: string,
  customStyle?: React.CSSProperties
}

interface DataWidthCssProperties extends Data {
  customStyle?: React.CSSProperties
}

const Schedule:React.FC<ScheduleType> = ({ width, left, remark = '', customStyle = {}  }) => {
  const style:React.CSSProperties = { position: 'absolute', top: '5px', left, width, height: '30px', backgroundColor: '#000', borderRadius: '5px', opacity: '0.7', boxSizing: 'border-box' };
  return (
    <div
      className="chart"
      data-remark={remark}
      style={{...style, ...customStyle}}
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
    /***
    * render最適化できずに重くなるため仕方なくDOM操作 TODOとしてTooltipのみのrenderが走るようにする
    ***/
    if(e.target.className === 'chart' && e.target.dataset.remark) {
      const tooltipRefClientRect = context.tooltipRef.current.getBoundingClientRect();
      const isMaxWindow = (window.innerWidth - e.clientX) > tooltipRefClientRect.width;
      context.tooltipRef.current.style.left = (e.clientX + (isMaxWindow ? pointerMargin : -(tooltipRefClientRect.width + pointerMargin))) + 'px';
      context.tooltipRef.current.style.top = (e.clientY - pointerMargin) + 'px';
      context.tooltipRef.current.innerText = e.target.dataset.remark;  
      context.tooltipRef.current.style.display = 'block';
    } else {
      context.tooltipRef.current.style.display = 'none'; 
      context.tooltipRef.current.innerText = null;    
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
              {productsData.data.map((sale: DataWidthCssProperties, i: number) => {
                const startDay = differenceInCalendarDays(sale.start, firstDay);
                const endDay = differenceInCalendarDays(sale.end, sale.start);
                const remark = sale.remark || '';
                const customStyle = sale.customStyle || {};
                return (
                  <Schedule
                    key={i}
                    width={`${endDay * CELLWIDTH}px`}
                    left={`${startDay * CELLWIDTH + CHARTMARGIN}px`}
                    remark={remark}
                    customStyle={customStyle}
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
