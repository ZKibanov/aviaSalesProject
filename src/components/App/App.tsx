import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import logo from './images/logo.svg';
import classes from './App.module.scss';
import SortTabs from '../SortTabs/SortTabs';
import CardList from '../CardList';
import Filters from '../Filters/Filters';
import { RootState } from '../../store/store';
import Spinner from '../Spinkit';

const App: FC = () => {
  const isLoading = useSelector((state: RootState) => state.ui.isLoading);

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
            <SortTabs />
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
