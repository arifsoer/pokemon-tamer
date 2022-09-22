/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { Row, Col } from "react-bootstrap";
import { useSelector } from 'react-redux'

import Pagination from '../../../components/Pagination';
import PokemonItem from "./PokemonItem";

const Explore = () => {
  const [pokemon, setPokemon] = useState([]);
  const allPokemons = useSelector(state => state.database.allPokemon)
  // pagination part
  const [currentPage, setCurrentPage] = useState(1)
  const maxItemPerPage = 20

  const filteredPokemons = (startIndex, endIndex) => {
    const results = allPokemons.filter((_, ind) => {
      return ind >= startIndex && ind <= endIndex
    })
    setPokemon(results)
  }

  const changePageHandler = async (pageNumber) => {
    setCurrentPage(pageNumber)
    const startIndex = (pageNumber - 1) * maxItemPerPage;
    const maxLength = startIndex + maxItemPerPage - 1
    let endIndex = maxLength
    if (allPokemons.length > 0) {
      endIndex = maxLength > (allPokemons.length - 1) ? (allPokemons.length - 1) : maxLength
    }

    filteredPokemons(startIndex, endIndex)
  }

  useEffect(() => {
    filteredPokemons(0, maxItemPerPage - 1)
  }, [])

  const pagination = <Pagination
    currentPage={currentPage}
    onPageChange={changePageHandler}
    pageSize={maxItemPerPage}
    totalCount={allPokemons.length}
  />

  return (
    <>
      <h1>Explore The Pokemon</h1>
      <hr />
      <div className='d-flex justify-content-center'>
        {pagination}
      </div>
      <Row>
        {pokemon.map((poke) => {
          return (
            <Col sm={6} lg={2} key={poke.name} className="d-flex">
              <PokemonItem className="mb-4" pokemon={poke} />
            </Col>
          );
        })}
      </Row>
      <div className='d-flex justify-content-center'>
        {pagination}
      </div>
      <div style={{ height: '40px' }} />
    </>
  );
};

export default Explore;