import { Success } from "../../../reducers/fetchWrapper";
import {
  FETCH_CARDS_FOR_DECKS,
  FETCH_CARDS_FOR_DECKS_MORE,
  FETCH_REMAINING_QUANTITIES,
} from "../../decks/store/constants";
import * as constants from "./constants";

const initialState = {
  items: [],
  total: 0,
};

export const cards = (state = initialState, action) => {
  switch (action.type) {
    case Success(constants.FETCH_CARDS):
    case Success(FETCH_CARDS_FOR_DECKS):
      return {
        items: action.payload.items,
        total: action.payload.total,
      };
    case Success(constants.FETCH_CARDS_MORE):
    case Success(FETCH_CARDS_FOR_DECKS_MORE):
      return {
        items: state.items.concat(action.payload.items),
        total: action.payload.total,
      };
    case constants.RESET_FILTERS:
      return initialState;
    default:
      return state;
  }
};

const initFiltersCards = {
  colors: [],
  rarities: [],
  types: [],
  missingCard: false,
  ownedCards: false,
  search: "",
  chapters: [],
  limit: 18,
  offset: 0,
  hasMore: true,
};

export const filtersCard = (state = initFiltersCards, action) => {
  switch (action.type) {
    case constants.SET_FILTERS:
      return action.payload;
    case constants.SET_COLORS:
      return { ...state, colors: action.payload };
    case constants.RESET_FILTERS:
      return initFiltersCards;
    default:
      return state;
  }
};

export const remainingQuantities = (state = { items: [] }, action) => {
  switch (action.type) {
    case Success(FETCH_REMAINING_QUANTITIES):
      return { items: action.payload.items };
    default:
      return state;
  }
};
