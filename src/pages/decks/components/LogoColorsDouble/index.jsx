import { Image } from "antd";
import React from "react";
import { getLinkColorImage } from "../../../../utils/colors";

const LogoColorsDouble = ({ deck }) => {
  return [deck.color1, deck.color2].map((color, index) => (
    <Image
      src={require(`../../../../assets/colors/${getLinkColorImage(color)}`)}
      alt={color}
      preview={false}
      style={{
        clipPath:
          index === 0
            ? "polygon(0 0, 50% 0, 50% 100%, 0 100%)"
            : "polygon(50% 0, 100% 0, 100% 100%, 50% 100%)",
        width: "50px",
        height: "50px",
        marginLeft: index === 0 ? "0" : "-50px",
        padding: "0",
      }}
    />
  ));
};

export default LogoColorsDouble;
