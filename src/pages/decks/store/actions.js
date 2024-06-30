import { fetchWrapper } from "../../../reducers/fetchWrapper";
import { getEnv } from "../../../utils/config";
import { mapFilters } from "../../../utils/data";
import * as constants from "./constants";

const env = getEnv();

export const fetchDeck = (id) => async (dispatch) => {
  return await dispatch(
    fetchWrapper(`${env}/decks/${id}`, { method: "GET" }, constants.FETCH_DECK)
  );
};

export const fetchDecks = () => async (dispatch) => {
  return await dispatch(
    fetchWrapper(`${env}/decks`, { method: "GET" }, constants.FETCH_DECKS)
  );
};

export const fetchCardsForDecks =
  (filters, fetchConstant = constants.FETCH_CARDS_FOR_DECKS) =>
  async (dispatch) => {
    const queryParams = new URLSearchParams(mapFilters(filters)).toString();
    return await dispatch(
      fetchWrapper(
        `${env}/cards/decks?${queryParams}`,
        { method: "GET" },
        fetchConstant
      )
    );
  };

export const fetchCardsForDecksMore = (filters) => async (dispatch) => {
  const queryParams = new URLSearchParams(mapFilters(filters)).toString();
  return await dispatch(
    fetchWrapper(
      `${env}/cards/decks?${queryParams}`,
      {},
      constants.FETCH_CARDS_FOR_DECKS_MORE
    )
  );
};

export const createDeck = (deck) => async (dispatch) => {
  return await dispatch(
    fetchWrapper(
      `${env}/decks`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ deck }),
      },
      constants.ON_CREATE_DECK
    )
  );
};

export const updateDeck = (id, deck) => async (dispatch) => {
  return await dispatch(
    fetchWrapper(
      `${env}/decks/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ deck }),
      },
      constants.ON_UPDATE_DECK
    )
  );
};

export const duplicateDeck = (id) => async (dispatch) => {
  return await dispatch(
    fetchWrapper(
      `${env}/decks/duplicate/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      },
      constants.ON_DUPLICATE_DECK
    )
  );
};

export const deleteDeck = (id) => async (dispatch) => {
  return await dispatch(
    fetchWrapper(
      `${env}/decks/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      },
      constants.ON_DUPLICATE_DECK
    )
  );
};

export const fetchRemainingQuantities = (filters) => async (dispatch) => {
  const queryParams = new URLSearchParams(mapFilters(filters)).toString();
  return await dispatch(
    fetchWrapper(
      `${env}/cards/remaining-quantities?${queryParams}`,
      { method: "GET" },
      constants.FETCH_REMAINING_QUANTITIES
    )
  );
};
