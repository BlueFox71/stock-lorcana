import React from "react";
import { Checkbox, Image } from "antd";

const CheckboxWithImage = ({ value, imageSrc, onChange, imageSize = 50 }) => {
  return (
    <Checkbox
      className="image-checkbox"
      value={value}
      onChange={onChange}
      style={{
        display: "flex",
        alignItems: "center",
        width: `${imageSize}px`,
        margin: `${imageSize / 20}px`,
      }}
    >
      <Image
        src={require(`../../../../assets/${imageSrc}`)}
        alt={value}
        preview={false}
        style={{ width: `${imageSize}px`, height: `${imageSize}px` }}
      />
    </Checkbox>
  );
};

export default CheckboxWithImage;
