export const SHEETNAMES = {
  PURCHASES: "Achats",
  SYNTHESIS_CARDS: "Nb de cartes total",
  STOCK_CHAPTER_1: "Inventaire - Chapitre 1",
  STOCK_CHAPTER_2: "Inventaire - Chapitre 2",
  STOCK_CHAPTER_3: "Inventaire - Chapitre 3",
  STOCK_CHAPTER_4: "Inventaire - Chapitre 4",
};

export const mapFilters = (array) =>
  Object.fromEntries(
    Object.entries(array).filter(
      ([_, value]) =>
        value !== null &&
        value !== "" &&
        !(Array.isArray(value) && value.length === 0)
    )
  );

export const getCurrentUser = () => {
  return (
    localStorage.getItem("username").charAt(0).toUpperCase() +
    localStorage.getItem("username").slice(1)
  );
};
