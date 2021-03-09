import React from "react";
import classes from "../App/App.module.scss";
import store from "../../store/store";
import * as actions from "../../store/actionTypes";
import filterBalancer from '../../store/filterBalancer'


function Filters() {
  const filtersState = store.getState().filters;
  const checkboxArray = [];
  const cEvent = (ev) => {
    const newFilters = filterBalancer(filtersState,ev.target.labels[0].textContent,ev.target.checked)
    store.dispatch({
      type: actions.FILTERS_CHANGED,
      payload: {
        filters:newFilters
      },
    });
  };

  for (let key in filtersState){
checkboxArray.push(      
<label className={classes.filter}>
  <input
    className={classes.filter__input}
    type="checkbox"
    checked = {filtersState[key]}
    onChange={cEvent}
  />
  <span className={classes.check__box} />
  {key}
</label>)
  }

  return (
    <aside className={classes.filter__container}>
      <h5 className={classes.filter__header}>КОЛИЧЕСТВО ПЕРЕСАДОК</h5>
        {checkboxArray}
    </aside>
  );
}

export default Filters;
