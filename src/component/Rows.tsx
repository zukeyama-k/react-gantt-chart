import React, { useContext } from 'react';
import { differenceInCalendarDays } from 'date-fns';
import { CELLWIDTH, CHARTMARGIN } from '../config';
import Row from './Row';
import { HeadRowsDataType, Data } from '../type/type';
import { Options } from '../react-gantt-chart';
import { Schedule } from './Schedule';

const pointerMargin = 20;

interface DataWidthCssProperties extends Data {
  customStyle?: React.CSSProperties;
}

interface RowsType {
  intervalDate: Date[];
  data: HeadRowsDataType[];
}

const Rows: React.FC<RowsType> = ({ intervalDate, data }) => {
  const [firstDay] = intervalDate;
  const context = useContext(Options) as any;
  const onShowTooltips = (e: any): void => {
    /***
     * render最適化できずに重くなるため仕方なくDOM操作 TODOとしてTooltipのみのrenderが走るようにする
     ***/
    if (e.target.className === 'chart' && e.target.dataset.remark) {
      const tooltipRefClientRect = context.tooltipRef.current.getBoundingClientRect();
      const isMaxWindow =
        window.innerWidth - e.clientX > tooltipRefClientRect.width;
      context.tooltipRef.current.style.left =
        e.clientX +
        (isMaxWindow
          ? pointerMargin
          : -(tooltipRefClientRect.width + pointerMargin)) +
        'px';
      context.tooltipRef.current.style.top = e.clientY - pointerMargin + 'px';
      context.tooltipRef.current.innerText = e.target.dataset.remark;
      context.tooltipRef.current.style.display = 'block';
    } else {
      context.tooltipRef.current.style.display = 'none';
      context.tooltipRef.current.innerText = null;
    }
  };

  return (
    <>
      {data.map((productsData: HeadRowsDataType, i: number) => {
        return (
          <div key={i} onMouseMove={onShowTooltips}>
            <Row
              key={i}
              id={productsData.id}
              data={intervalDate}
              isShowDay={false}
              width={`${intervalDate.length * CELLWIDTH}px`}
              onClick={context.options.onClick}
            >
              {productsData.data.map(
                (sale: DataWidthCssProperties, i: number) => {
                  const startDay = differenceInCalendarDays(
                    sale.start,
                    firstDay
                  );
                  const endDay = differenceInCalendarDays(sale.end, sale.start);
                  return (
                    <Schedule
                      key={i}
                      width={`${endDay * CELLWIDTH}px`}
                      left={`${startDay * CELLWIDTH + CHARTMARGIN}px`}
                      remark={sale.remark || ''}
                      customStyle={sale.customStyle || {}}
                      dataId={sale.id}
                    ></Schedule>
                  );
                }
              )}
            </Row>
          </div>
        );
      })}
    </>
  );
};

export default Rows;
