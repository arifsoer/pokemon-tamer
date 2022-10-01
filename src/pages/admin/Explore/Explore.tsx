/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";

import { useAppSelector } from "../../../redux/hooks";

import Pagination from "../../../components/Pagination";
import PokemonItem from "./PokemonItem";

const Explore = () => {
  const allPokemons = useAppSelector((state) => state.database.allPokemon);
  // pagination part
  const [currentPage, setCurrentPage] = useState(1);
  const maxItemPerPage = 18;

  const startIndex = (currentPage - 1) * maxItemPerPage;
  const maxLength = startIndex + maxItemPerPage - 1;
  let endIndex = maxLength;
  if (allPokemons.length > 0) {
    endIndex =
      maxLength > allPokemons.length - 1 ? allPokemons.length - 1 : maxLength;
  }

  const showedPokemons = allPokemons.filter(
    (_, ind) => ind >= startIndex && ind <= endIndex
  );

  const changePageHandler = async (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const pagination = (
    <Pagination
      currentPage={currentPage}
      onPageChange={changePageHandler}
      pageSize={maxItemPerPage}
      totalCount={allPokemons.length}
    />
  );

  return (
    <>
      <h1>Explore The Pokemon</h1>
      <hr />
      <div className="d-flex justify-content-center">{pagination}</div>
      <Row>
        {showedPokemons.map((poke) => {
          return (
            <Col sm={6} lg={2} key={poke.name} className="d-flex">
              <PokemonItem className="mb-4" pokemon={poke} />
            </Col>
          );
        })}
      </Row>
      <div className="d-flex justify-content-center">{pagination}</div>
      <div style={{ height: "40px" }} />
    </>
  );
};

export default Explore;
