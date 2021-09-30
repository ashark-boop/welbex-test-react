import React from 'react';

const Row = ({row}) => {
  return (
    <div className="table-row">
        <p className="row-title">{row.title}</p>
        <p className="row-quantity">{row.quantity}</p>
        <p className="row-distance">{row.distance}</p>
        {/* Обрезаем дату */}
        <p className="row-dat">{row.dat.slice(0, 10)}</p>
    </div>
    );
}

export default Row;