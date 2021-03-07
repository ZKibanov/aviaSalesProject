import React from "react";
import Card from "../Card";
import store from '../../store/store'

function CardList() {
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
 if (tickets && sortingOrder){
   for (let i = 0; i <= ticketsQuantity;i+=1){
   const ticketIndex = sortingOrder[i].index;
   const ticket = (tickets[ticketIndex])
   finalArray.push(<Card key = {ticketIndex} card={ticket}/>)
 } 
}
  return finalArray;
}

export default CardList;
