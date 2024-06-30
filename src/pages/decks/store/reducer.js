import { Success } from "../../../reducers/fetchWrapper";
import * as constants from "./constants";

const initialState = {
  items: [],
  total: 0,
};

export const decks = (state = initialState, action) => {
  switch (action.type) {
    case Success(constants.FETCH_DECKS):
      return {
        items: action.payload.items,
        total: action.payload.total,
      };
    default:
      return state;
  }
};

export const deck = (state = {}, action) => {
  switch (action.type) {
    case Success(constants.FETCH_DECK):
      return { ...action.payload.deck };

    default:
      return state;
  }
};
