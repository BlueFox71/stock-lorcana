import { Success } from "../../../reducers/fetchWrapper";
import * as constants from "./constants";

const initialState = {
  items: [],
  total: 0,
};

export const cards = (state = initialState, action) => {
  switch (action.type) {
    case Success(constants.FETCH_CARDS):
      return {
        items: action.payload.items,
        total: action.payload.total,
      };
    case Success(constants.FETCH_CARDS_MORE):
      return {
        items: state.items.concat(action.payload.items),
        total: action.payload.total,
      };
    default:
      return state;
  }
};

const initFiltersCards = {
  colors: [],
  rarities: [],
  types: [],
  missingCard: false,
  search: "",
  chapters: [],
  limit: 18,
  offset: 0,
  hasMore: true
};

export const filtersCard = (state = initFiltersCards, action) => {
  switch (action.type) {
    case constants.SET_FILTERS:
      return action.payload;
    case constants.RESET_FILTERS:
      return initFiltersCards;
    default:
      return state;
  }
};
