import React from "react";
import classes from "../App/App.module.scss";
import store from "../../store/store";
import * as actions from "../../store/actionTypes";

function Filters() {
  const cEvent = (ev) => {
    store.dispatch({
      type: actions.FILTERS_CHANGED,
      payload: {
        filterName: ev.target.labels[0].textContent,
        filterState: ev.target.checked,
      },
    });
  };

  return (
    <aside className={classes.filter__container}>
      <h5 className={classes.filter__header}>КОЛИЧЕСТВО ПЕРЕСАДОК</h5>
      <label className={classes.filter}>
        <input
          className={classes.filter__input}
          type="checkbox"
          onChange={cEvent}
        />
        <span className={classes.check__box} />
        Все
      </label>
      <label className={classes.filter}>
        <input
          className={classes.filter__input}
          type="checkbox"
          onChange={cEvent}
        />
        <span className={classes.check__box} />
        Без пересадок
      </label>
      <label className={classes.filter}>
        <input
          className={classes.filter__input}
          type="checkbox"
          onChange={cEvent}
        />
        <span className={classes.check__box} />1 пересадка
      </label>
      <label className={classes.filter}>
        <input
          className={classes.filter__input}
          type="checkbox"
          onChange={cEvent}
        />
        <span className={classes.check__box} />2 пересадки
      </label>
      <label className={classes.filter}>
        <input
          className={classes.filter__input}
          type="checkbox"
          onChange={cEvent}
        />
        <span className={classes.check__box} />3 пересадки
      </label>
    </aside>
  );
}

export default Filters;
