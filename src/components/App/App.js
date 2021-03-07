import logo from "./images/logo.svg";
import classes from "./App.module.scss";
import CardList from "../CardList";
import Filters from "../Filters/Filters";
import store from '../../store/store'
import * as actions from "../../store/actionTypes";

function App() {
    const cEvent = (ev) => {
        store.dispatch({
          type: actions.SET_SORTING,
          payload: {
            filterName: ev.target.textContent,
          },
        });
      };

    const getMoreTickets = () =>{
      store.dispatch({
        type:actions.GET_MORE_TICKETS
      })
    }
  return (
    <>
      <div className={classes.App}>
        <header className={classes["App-header"]}>
          <img src={logo} className={classes["App-logo"]} alt="logo" />
        </header>
      <main className={classes.main}>
        <Filters />
        <section className={classes.content__container}>
          <nav className={classes.nav}>
            <button className={classes.nav__button} onClick={cEvent}>Самый дешевый</button>
            <button className={classes.nav__button} onClick={cEvent}>Самый быстрый</button>
            <button className={classes.nav__button} onClick={cEvent}>Оптимальный</button>
          </nav>
          <div className={classes.content}>
            <CardList />
          </div>
          <button className ={classes.nav__button + ' ' + classes["nav__button-more"]} onClick = {getMoreTickets}>показать еще</button>
        </section>
      </main>
      </div>
    </>
  );
}

export default App;
