import { fetchWrapper } from "../../../reducers/fetchWrapper";
import { getEnv } from "../../../utils/config";
import {} from "./actions";
import { FETCH_CARDS, FETCH_CARDS_MORE, IMPORT_CARDS } from "./constants";

const env = getEnv();

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
    fetchWrapper(`${env}/cards?${queryParams}`, { method: "GET" }, FETCH_CARDS)
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
    fetchWrapper(`${env}/cards?${queryParams}`, {}, FETCH_CARDS_MORE)
  );
};

export const importCards = (cards, chapter) => async (dispatch) => {
  return await dispatch(
    fetchWrapper(
      `${env}/import`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({chapter, cards}),
      },
      IMPORT_CARDS
    )
  );
};
