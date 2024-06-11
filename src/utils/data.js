import axios from "axios";
import * as XLSX from "xlsx";

export const SHEETNAMES = {
  PURCHASES: "Achats",
  SYNTHESIS_CARDS: "Nb de cartes total",
  STOCK_CHAPTER_1: "Inventaire - Chapitre 1",
  STOCK_CHAPTER_2: "Inventaire - Chapitre 2",
  STOCK_CHAPTER_3: "Inventaire - Chapitre 3",
  STOCK_CHAPTER_4: "Inventaire - Chapitre 4",
};

const getDataFromFile = (sheetname) => {
  return axios
    .get("/lorcana.xlsx", {
      responseType: "arraybuffer",
    })
    .then((response) => {
      const data = new Uint8Array(response.data);
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[sheetname];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      return jsonData;
    })
    .catch((error) => {
      console.error("Cannot access file ./lorcana.xlsx", error);
    });
};
const getDataChapter = async (sheetname) => {
  const chapter1 = await getDataFromFile(sheetname);
  const stock = chapter1
    .filter((item) => Number(item["__EMPTY"]))
    .map((card) => ({
      id: card["__EMPTY"],
      name: card["__EMPTY_1"],
      color: card["__EMPTY_2"],
      rarity: card["__EMPTY_3"],
      type: card["__EMPTY_4"],
      quantity: card["__EMPTY_5"],
      countShiny: card["__EMPTY_6"],
      chapter: chapter1[0]["__EMPTY"].slice(-1),
    }));
  return stock;
};

export const getDataStock1 = async () => {
  const chapter1 = await getDataChapter(SHEETNAMES.STOCK_CHAPTER_1);
  const chapter2 = await getDataChapter(SHEETNAMES.STOCK_CHAPTER_2);
  const chapter3 = await getDataChapter(SHEETNAMES.STOCK_CHAPTER_3);
  const chapter4 = await getDataChapter(SHEETNAMES.STOCK_CHAPTER_4);

  let chapters = chapter1.concat(chapter2);
  chapters = chapters.concat(chapter3);
  chapters = chapters.concat(chapter4);
  return chapters;
};

export const getDataStock = async (filters = {}) => {
  const query = Object.fromEntries(
    Object.entries(filters).filter(
      ([key, value]) =>
        value !== null &&
        value !== "" &&
        !(Array.isArray(value) && value.length === 0)
    )
  );
  const queryParams = new URLSearchParams(query).toString();
  return await fetch(`http://localhost:5000/api/cards?${queryParams}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};
