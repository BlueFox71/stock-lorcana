import React from "react";

const Loader = ({ isLoading }) =>
  isLoading && (
    <div className="overlay">
      <span className="loader"></span>
    </div>
  );

export default Loader;
