import React from "react";
import Card from "../Card";
import store from '../../store/store';
import NoTicketsIndicator from '../NoTicketsIndicator'
import classes from "./CardList.module.scss";
import * as actions from "../../store/actionTypes";



function CardList() {
  const getMoreTickets = () =>{
    store.dispatch({
      type:actions.GET_MORE_TICKETS
    })
  }

  let finalArray =[];
  const ticketsQuantity = store.getState().renderedTickets;
  const tickets = store.getState().tickets;
  const sortingValue = store.getState().sorting.filterName;
  let sortingOrder;
  switch (sortingValue){
    case "Самый быстрый":
      sortingOrder = store.getState().timeSorted;
      break;
    case "Самый дешевый":
      sortingOrder = store.getState().priceSorted;
      break;
    case "Оптимальный":
      sortingOrder = store.getState().optimalSorted; 
      break;
    default:
      sortingOrder = undefined;
  }

  const filtersState = store.getState().filters;
  const filterMatrix = [filtersState['Без пересадок'],filtersState['1 пересадка'],filtersState['2 пересадки'],filtersState['3 пересадки']];
  let filteredArray = [];
  if (!filterMatrix.includes(true)) return <NoTicketsIndicator/>;
  if (tickets && sortingOrder){
    let j = 0;
  while (filteredArray.length < ticketsQuantity){
    if (filterMatrix[sortingOrder[j].stops]){
      filteredArray.push(sortingOrder[j])
    }
    j+=1;
  }

  console.log(filteredArray);
  if (tickets && filteredArray){
   for (let i = 0; i < ticketsQuantity;i+=1){
   const ticketIndex = filteredArray[i].index;
   const ticket = (tickets[ticketIndex])
   finalArray.push(<Card key = {ticketIndex} card={ticket}/>)
 } 
 finalArray.push(<button className ={classes["nav__button-more"]} onClick = {getMoreTickets}>показать еще</button>
 )
}
  }
  return finalArray;
}

export default CardList;
