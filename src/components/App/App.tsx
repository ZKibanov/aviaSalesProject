import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import logo from './images/logo.svg';
import classes from './App.module.scss';
import CardList from '../CardList';
import Filters from '../Filters/Filters';
import { RootState } from '../../store/store';
import Spinner from '../Spinkit';
import * as actions from '../../store/actions';

const App: FC = () => {
  const dispatch = useDispatch();
  const cEvent = (ev: React.MouseEvent<HTMLButtonElement>) => {
    if (ev.currentTarget.textContent) {
      const sortingValue = ev.currentTarget.textContent;
      dispatch(actions.setSorting(sortingValue));
    }
  };

  const isLoading = useSelector((state: RootState) => state.ui.isLoading);
  const activeButton = useSelector(
    (state: RootState) => state.ui.sorting.filterName
  );
  const LoadingIndicator = isLoading && <Spinner />;

  return (
    <>
      <div className={classes.App}>
        <header className={classes['App-header']}>
          <img src={logo} className={classes['App-logo']} alt="logo" />
        </header>
        <main className={classes.main}>
          <Filters />
          <section className={classes.content__container}>
            <nav className={classes.nav}>
              <button
                type="button"
                className={`${classes.nav__button} ${
                  activeButton === 'Самый дешевый'
                    ? classes['nav__button-active']
                    : null
                }`}
                onClick={cEvent}
              >
                Самый дешевый
              </button>
              <button
                type="button"
                className={`${classes.nav__button} ${
                  activeButton === 'Самый быстрый'
                    ? classes['nav__button-active']
                    : null
                }`}
                onClick={cEvent}
              >
                Самый быстрый
              </button>
              <button
                type="button"
                className={`${classes.nav__button} ${
                  activeButton === 'Оптимальный'
                    ? classes['nav__button-active']
                    : null
                }`}
                onClick={cEvent}
              >
                Оптимальный
              </button>
            </nav>
            <div className={classes.content}>
              {LoadingIndicator}
              <CardList />
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default App;
