import React from 'react';
export const Schedule = ({ width, left, dataId, remark = '', customStyle = {}, onClick, }) => {
    const style = {
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
    return (React.createElement("div", { className: "chart", "data-remark": remark, "data-id": dataId, style: { ...style, ...customStyle }, onClick: onClick }));
};
