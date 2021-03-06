import React from 'react';
import { format, add } from 'date-fns';
import { Ticket } from '../../types';
import classes from './Card.module.scss';

interface IProps {
  card: Ticket;
}

function declOfNum(num: number, text_forms: string[]) {
  const n = Math.abs(num) % 100;
  const n1 = n % 10;
  if (n === 0) {
    return text_forms[0];
  }
  if (n >= 5) {
    return text_forms[3];
  }
  if (n1 > 1 && n1 < 5) {
    return text_forms[2];
  }
  if (n1 === 1) {
    return text_forms[1];
  }
  return text_forms[2];
}

const transferWordForms = [
  'без пересадок',
  'пересадка',
  'пересадки',
  'пересадок',
];

function Card(props: IProps) {
  const { card } = props;
  const forwardFly = card.segments[0];
  const returnFly = card.segments[1];

  const cardLogo = ['EK', 'S7', 'EY', 'FV', 'MH', 'SU', 'TG'].includes(
    card.carrier
  )
    ? `/images/${card.carrier}.svg`
    : `//pics.avs.io/99/36/${card.carrier}.png`;

  const forwardTransfers = forwardFly.stops.length;
  const returnFlyTransfers = returnFly.stops.length;

  return (
    <li className={classes.content__card}>
      <div className={classes['card-header']}>
        <span className={classes['card-price']}>{card.price} </span>
        <span>
          <img
            src={cardLogo}
            width="110px"
            height="36px"
            alt="avia-company-logo"
          />
        </span>
      </div>
      <div className={classes['card-body']}>
        <div className={classes['card-body__part']}>
          <p className={classes['card-body__part-main']}>
            {forwardFly.origin} - {forwardFly.destination}
          </p>
          <p className={classes['card-body__part-details']}>
            {format(new Date(forwardFly.date), 'HH:mm')}-
            {format(
              add(new Date(forwardFly.date), { minutes: forwardFly.duration }),
              'HH:mm'
            )}
          </p>
        </div>

        <div className={classes['card-body__part']}>
          <p className={classes['card-body__part-main']}>в пути</p>
          <p className={classes['card-body__part-details']}>
            {Math.floor(forwardFly.duration / 60)}:
            {(card.segments[0].duration % 60).toString().padStart(2, '0')}
          </p>
        </div>

        <div className={classes['card-body__part']}>
          <p className={classes['card-body__part-main']}>
            {forwardTransfers || null}{' '}
            {declOfNum(forwardTransfers, transferWordForms)}
          </p>
          <p className={classes['card-body__part-details']}>
            {forwardFly.stops.join(', ')}
          </p>
        </div>

        <div className={classes['card-body__part']}>
          <p className={classes['card-body__part-main']}>
            {returnFly.origin} - {returnFly.destination}
          </p>
          <p className={classes['card-body__part-details']}>
            {format(new Date(returnFly.date), 'HH:mm')}-
            {format(
              add(new Date(returnFly.date), { minutes: returnFly.duration }),
              'HH:mm'
            )}
          </p>
        </div>

        <div className={classes['card-body__part']}>
          <p className={classes['card-body__part-main']}>в пути</p>
          <p className={classes['card-body__part-details']}>
            {Math.floor(returnFly.duration / 60)}:
            {(returnFly.duration % 60).toString().padStart(2, '0')}
          </p>
        </div>
        <div className={classes['card-body__part']}>
          <p className={classes['card-body__part-main']}>
            {returnFlyTransfers || null}{' '}
            {declOfNum(returnFlyTransfers, transferWordForms)}
          </p>
          <p className={classes['card-body__part-details']}>
            {returnFly.stops.join(', ')}
          </p>
        </div>
      </div>
    </li>
  );
}

export default Card;
