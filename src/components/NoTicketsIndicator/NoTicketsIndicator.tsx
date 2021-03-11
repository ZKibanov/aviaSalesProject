import React, { FC } from 'react';
import compass from './compass.svg';

const NoTicketsIndicator: FC = () => (
  <div className="compass__wrap">
    <p className="compass-v"> &#9660; </p>
    <img
      className="compass"
      src={compass}
      width="100px"
      height="100px"
      alt="rotating compass"
    />
    <h4 className="compass__message">
      Рейсов, подходящих под заданные фильтры, не найдено
    </h4>
  </div>
);

export default NoTicketsIndicator;
