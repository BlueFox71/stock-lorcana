import React from "react";
import { Empty } from "antd";

const NoData = () => {
  return (
    <Empty
      image={require("../../assets/no_data.png")}
      imageStyle={{
        height: 250,
        opacity: 0.8,
      }}
      description={
        <span className="text-beige" style={{ fontSize: "20px" }}>
          Pas de données
        </span>
      }
    />
  );
};

export default NoData;
