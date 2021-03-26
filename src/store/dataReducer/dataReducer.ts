import { createSlice } from '@reduxjs/toolkit';
import { Ticket } from '../../components/types';

interface DataState {
  tickets: Ticket[];
}

const initialState = {
  tickets: [],
} as DataState;

const dataReducer = createSlice({
  name: 'data',
  initialState,
  /* eslint-disable no-param-reassign */
  reducers: {
    ticketsAdded(state, action) {
      state.tickets = [...action.payload];
    },
  },
  /* eslint-enable no-param-reassign */
});

export const { ticketsAdded } = dataReducer.actions;

export default dataReducer.reducer;
