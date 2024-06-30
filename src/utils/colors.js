export const COLOR_INK = {
  AMBRE: "Ambre",
  AMETHYSTE: "Améthyste",
  EMEREAUDE: "Émeraude",
  RUBIS: "Rubis",
  SAPHIR: "Saphir",
  ACIER: "Acier",
};

export const hexaColorsInk = {
  AMBRE: "#E8A43B",
  AMETHYSTE: "#7F3778",
  EMEREAUDE: "#28892E",
  RUBIS: "#D40932",
  SAPHIR: "#038BC7",
  ACIER: "#9FABB5",
};

export const rgbColorsInk = {
  AMBRE: "rgb(232, 164, 59)",
  AMETHYSTE: "rgb(127, 55, 120)",
  EMEREAUDE: "rgb(40, 137, 46)",
  RUBIS: "rgb(212, 9, 50)",
  SAPHIR: "rgb(3, 139, 199)",
  ACIER: "rgb(159, 171, 181)",
};
export const hexaDarkColorsInk = {
  AMBRE: "#22190C",
  AMETHYSTE: "#462A46",
  EMEREAUDE: "#0E180E",
  RUBIS: "#652B23",
  SAPHIR: "#205062",
  ACIER: "#44484B",
};

export const colors = {
  primary: "#0d103b",
  lightPrimary: "#2F687A",
  secondary: "#791593",
};

export const getHexaColorByColorInk = (colorInk, isDark = false) => {
  switch (colorInk) {
    case COLOR_INK.AMBRE:
      return !isDark ? hexaColorsInk.AMBRE : hexaDarkColorsInk.AMBRE;
    case COLOR_INK.AMETHYSTE:
      return !isDark ? hexaColorsInk.AMETHYSTE : hexaDarkColorsInk.AMETHYSTE;
    case COLOR_INK.EMEREAUDE:
      return !isDark ? hexaColorsInk.EMEREAUDE : hexaDarkColorsInk.EMEREAUDE;
    case COLOR_INK.RUBIS:
      return !isDark ? hexaColorsInk.RUBIS : hexaDarkColorsInk.RUBIS;
    case COLOR_INK.SAPHIR:
      return !isDark ? hexaColorsInk.SAPHIR : hexaDarkColorsInk.SAPHIR;
    case COLOR_INK.ACIER:
      return !isDark ? hexaColorsInk.ACIER : hexaDarkColorsInk.ACIER;
    default:
      break;
  }
};

export const getLinkColorImage = (color) => {
  switch (color) {
    case COLOR_INK.AMBRE:
      return "amber.webp";
    case COLOR_INK.AMETHYSTE:
      return "amethyst.webp";
    case COLOR_INK.EMEREAUDE:
      return "emerald.webp";
    case COLOR_INK.RUBIS:
      return "ruby.webp";
    case COLOR_INK.ACIER:
      return "steel.png";
    case COLOR_INK.SAPHIR:
      return "sapphire.webp";

    default:
      break;
  }
};

export const getRgbColorByColorInk = (color) => {
  switch (color) {
    case COLOR_INK.AMBRE:
      return rgbColorsInk.AMBRE;
    case COLOR_INK.AMETHYSTE:
      return rgbColorsInk.AMETHYSTE;
    case COLOR_INK.EMEREAUDE:
      return rgbColorsInk.EMEREAUDE;
    case COLOR_INK.RUBIS:
      return rgbColorsInk.RUBIS;
    case COLOR_INK.ACIER:
      return rgbColorsInk.ACIER;
    case COLOR_INK.SAPHIR:
      return rgbColorsInk.SAPHIR;

    default:
      break;
  }
};
