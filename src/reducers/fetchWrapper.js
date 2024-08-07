export const fetchWrapper = (url, params, actionType) => async (dispatch) => {
  dispatch({ type: `${actionType}_REQUEST` });
  dispatch({ type: `${actionType}_START_LOADING` });
  let data = null
  try {
    const response = await fetch(url, params);
    data = await response.json();
    dispatch({ type: `${actionType}_SUCCESS`, payload: data });
  } catch (error) {
    dispatch({ type: `${actionType}_FAILURE`, payload: error.toString() });
    setTimeout(() => dispatch({ type: `${actionType}_STOP_LOADING` }), 280);
  }
  setTimeout(() => dispatch({ type: `${actionType}_STOP_LOADING` }), 280);
  return data
};

export const loadingSelector = (selectors) => (state) => {
  const { loadings } = state.loadings;
  return selectors.every((item) => loadings.includes(item + "_START_LOADING"));
};

export const Success = (type) => `${type}_SUCCESS`;
export const Failure = (type) => `${type}_FAILURE`;
