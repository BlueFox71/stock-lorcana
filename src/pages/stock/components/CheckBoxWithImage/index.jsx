import React from "react";
import { Checkbox, Image } from "antd";

const CheckboxWithImage = ({ value, imageSrc, onChange }) => {
  return (
    <Checkbox
      className="image-checkbox"
      value={value}
      onChange={onChange}
      style={{ display: "flex", alignItems: "center" }}
    >
      <Image
        src={require(`../../../../assets/${imageSrc}`)}
        alt={value}
        preview={false}
        style={{ width: "50px", height: "50px", marginRight: "8px" }}
      />
    </Checkbox>
  );
};

export default CheckboxWithImage;
