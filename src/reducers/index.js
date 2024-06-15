import { combineReducers } from "@reduxjs/toolkit";
import { cards, filtersCard } from "../pages/stock/store/reducer";
import { authentication } from "./authentication";

const loadings = (state = { loadings: [] }, action) => {
  if (
    action.type?.includes("_START_LOADING") &&
    !state.loadings.includes(action.type)
  ) {
    const { loadings } = state;
    const newLoadings = [...loadings, action.type]; // Créer une nouvelle copie du tableau avec la nouvelle action ajoutée
    return { loadings: newLoadings }; // Retourner un nouvel objet d'état
  }
  if (action.type?.includes("_STOP_LOADING")) {
    const { loadings } = state;
    const index = loadings.indexOf(action.type.replace("STOP", "START")); // Utilisez action.type au lieu de 5
    if (index > -1) {
      const newLoadings = [
        ...loadings.slice(0, index),
        ...loadings.slice(index + 1),
      ]; // Créer une nouvelle copie du tableau sans l'action stoppée

      return { loadings: newLoadings }; // Retourner un nouvel objet d'état
    }
    return state;
  }
  return state;
};

const rootReducer = combineReducers({
  cards,
  filtersCard,
  loadings,
  authentication
});

export default rootReducer;
