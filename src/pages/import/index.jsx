import React, { useState } from "react";
import * as XLSX from "xlsx";
import { SHEETNAMES } from "../../utils/data";
import styled from "styled-components";
import { hexaColorsInk } from "../../utils/colors";
import { Button, Row } from "antd";
import { Link } from "react-router-dom";
import { importCards } from "../stock/store/actions";
import { useDispatch, useSelector } from "react-redux";
import { loadingSelector } from "../../reducers/fetchWrapper";
import { IMPORT_CARDS } from "../stock/store/constants";
import Loader from "../../shared/Loader";

const Input = styled.input`
  width: 50%;
  font-size: 50px;
  border-radius: 10px;
  background: ${hexaColorsInk.AMETHYSTE};
  color: white;
`;

const selector = (state) => ({
  loading: loadingSelector([IMPORT_CARDS])(state),
});

const Import = () => {
  const [successful, setSuccessful] = useState(false);
  const [chaptersState, setChapters] = useState(null);
  const dispatch = useDispatch();
  const { loading } = useSelector(selector);

  const getDataChapter = async (workbook, sheetname) => {
    const worksheet = workbook.Sheets[sheetname];
    const chapter = XLSX.utils.sheet_to_json(worksheet);

    const stock = chapter
      .filter((item) => Number(item["__EMPTY"]))
      .map((card) => ({
        id: card["__EMPTY"],
        name: card["__EMPTY_1"],
        color: card["__EMPTY_2"],
        rarity: card["__EMPTY_3"],
        type: card["__EMPTY_4"],
        quantity: card["__EMPTY_5"],
        countShiny: card["__EMPTY_6"],
        chapter: chapter[0]["__EMPTY"].slice(-1),
      }));
    return stock;
  };

  const getDataStock = async (workbook) => {
    const chapter1 = await getDataChapter(workbook, SHEETNAMES.STOCK_CHAPTER_1);
    const chapter2 = await getDataChapter(workbook, SHEETNAMES.STOCK_CHAPTER_2);
    const chapter3 = await getDataChapter(workbook, SHEETNAMES.STOCK_CHAPTER_3);
    const chapter4 = await getDataChapter(workbook, SHEETNAMES.STOCK_CHAPTER_4);

    return { 1: chapter1, 2: chapter2, 3: chapter3, 4: chapter4 };
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const chapters = await getDataStock(workbook);
      setChapters(chapters);
    };
    reader.readAsBinaryString(file);
  };

  const handleImport = async () => {
    [1, 2, 3, 4].forEach(async (index) => {
      await dispatch(importCards(chaptersState[index], index)).then(() => {
        setSuccessful(true);
      });
    });
  };

  return (
    <>
      <Loader isLoading={loading} />
      <h1>Importer des cartes</h1>
      <Row
        align={"middle"}
        justify={"center"}
        style={{ marginTop: "200px", display: "flex", flexDirection: "column" }}
      >
        {successful ? (
          <p
            style={{
              color: hexaColorsInk.EMEREAUDE,
              padding: "20px",
              background: "white",
              fontSize: "20px",
              borderRadius: "20px",
            }}
          >
            Les cartes ont été importé avec succès !
          </p>
        ) : (
          <Input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
        )}
        {chaptersState && !successful && (
          <Button
            type="primary"
            style={{
              marginTop: "60px",
              height: "auto",
              width: "500px",
              fontSize: "25px",
            }}
            onClick={handleImport}
          >
            Envoyer le ficher et importer les données
          </Button>
        )}
        <Link to="/">
          <Button
            style={{
              marginTop: "30px",
              height: "auto",
              width: "500px",
              fontSize: "25px",
            }}
          >
            Retourner à l'accueil
          </Button>
        </Link>
      </Row>
    </>
  );
};

export default Import;
