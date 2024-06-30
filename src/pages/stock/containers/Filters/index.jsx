import React, { useState } from "react";
import FiltersComponent from "../../components/Filters";
import { FloatButton } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchCards } from "../../store/actions";
import { FilterOutlined } from "@ant-design/icons";
import { FETCH_CARDS, RESET_FILTERS, SET_FILTERS } from "../../store/constants";
import { loadingSelector } from "../../../../reducers/fetchWrapper";
import { CONTEXT } from "../../../../shared/CardsList";

const selector = (state) => ({
  filters: state.filtersCard,
  isFetching: loadingSelector([FETCH_CARDS])(state),
});

const Filters = ({ total, context }) => {
  const dispatch = useDispatch();
  const { filters, isFetching } = useSelector(selector);
  const [visible, setVisible] = useState(false);

  const handleFetchCards = async (filtersToApply = filters) => {
    dispatch(fetchCards(filtersToApply));
  };

  const handleReset = async () => {
    await dispatch({ type: RESET_FILTERS });
    await handleFetchCards();
  };

  let debounceTimeoutId = null;
  const throttleSearch = async (callback, interval = 250) => {
    clearTimeout(debounceTimeoutId);
    debounceTimeoutId = setTimeout(() => callback(), interval);
  };

  const handleSearch = async (e) => {
    const { value } = e.target;
    throttleSearch(() => {
      handleFetchCards({
        ...filters,
        search: value,
        offset: 0,
      });
    });
  };

  const handleChange = async (name, value) => {
    const filtersToApply = {
      ...filters,
      [name]: value,
      offset: 0,
      hasMore: true,
    };
    await dispatch({ type: SET_FILTERS, payload: filtersToApply });
    handleFetchCards(filtersToApply);
  };

  const handleSetVisible = () => {
    if (!visible) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    setVisible(!visible);
  };

  return visible ? (
    <FiltersComponent
      countCards={total}
      filters={filters}
      onChange={handleChange}
      onReset={handleReset}
      onClose={() => setVisible(false)}
      onSearch={handleSearch}
      isFetching={isFetching}
      withoutColors={context === CONTEXT.DECK_NEW}
    />
  ) : (
    <FloatButton
      icon={<FilterOutlined />}
      shape="circle"
      onClick={handleSetVisible}
    />
  );
};

export default Filters;
