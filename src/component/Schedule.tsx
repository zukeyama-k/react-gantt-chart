import React, { MouseEvent } from 'react';
interface ScheduleType {
  width: string;
  left: string;
  remark?: string;
  customStyle?: React.CSSProperties;
  dataId: string | number;
  onClick?: (event: MouseEvent<HTMLInputElement>) => void;
}

export const Schedule: React.FC<ScheduleType> = ({
  width,
  left,
  dataId,
  remark = '',
  customStyle = {},
  onClick,
}) => {
  const style: React.CSSProperties = {
    position: 'absolute',
    top: '5px',
    left,
    width,
    height: '30px',
    backgroundColor: '#000',
    borderRadius: '5px',
    opacity: '0.7',
    boxSizing: 'border-box',
  };
  return (
    <div
      className="chart"
      data-remark={remark}
      data-id={dataId}
      style={{ ...style, ...customStyle }}
      onClick={onClick}
    ></div>
  );
};
