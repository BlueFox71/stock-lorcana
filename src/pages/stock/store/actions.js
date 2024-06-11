import { fetchWrapper } from "../../../reducers/fetchWrapper";
import {} from "./actions";
import { FETCH_CARDS, FETCH_CARDS_MORE } from "./constants";

export const fetchCards = (filters) => async (dispatch) => {
  const query = Object.fromEntries(
    Object.entries(filters).filter(
      ([_, value]) =>
        value !== null &&
        value !== "" &&
        !(Array.isArray(value) && value.length === 0)
    )
  );
  const queryParams = new URLSearchParams(query).toString();
  return await dispatch(
    fetchWrapper(`http://localhost:5000/api/cards?${queryParams}`, FETCH_CARDS)
  );
};

export const fetchCardsMore = (filters) => async (dispatch) => {
  const query = Object.fromEntries(
    Object.entries(filters).filter(
      ([_, value]) =>
        value !== null &&
        value !== "" &&
        !(Array.isArray(value) && value.length === 0)
    )
  );
  const queryParams = new URLSearchParams(query).toString();
  return await dispatch(
    fetchWrapper(`http://localhost:5000/api/cards?${queryParams}`, FETCH_CARDS_MORE)
  );
};