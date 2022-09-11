/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { Row, Col, Pagination } from "react-bootstrap";

import { useGetApi } from '../../hooks/useApi'

import PokemonItem from "./PokemonItem";

const Explore = () => {
  const [pokemon, setPokemon] = useState({ results: [], count: 0 });
  const { doRequest: getPokemonData, setQueryParamsCollection: setQueryParams, error } = useGetApi({ baseUrl: '/pokemon' })
  // pagination part
  const [currentPage, setCurrentPage] = useState(1)
  const pageItems = []
  const maxItemPerPage = 50
  const maxPages = Math.floor(pokemon.count / maxItemPerPage)
  const changePageHandler = async (pageNumber) => {
    setCurrentPage(pageNumber)
    setQueryParams([
      `offset=${(pageNumber - 1) * maxItemPerPage}`,
      `limit=${maxItemPerPage}`
    ])

    const results = await getPokemonData()
    setPokemon(results)
  }

  const initialize = async () => {
    try {
      const results = await getPokemonData()
      setPokemon(results)
    } catch (error) {
      alert(error)
    }
  }

  for (let index = 1; index < maxPages; index++) {
    pageItems.push(
      <Pagination.Item key={index} active={index === currentPage} onClick={() => changePageHandler(index)}>
        {index}
      </Pagination.Item>
    )
  }

  useEffect(() => {
    initialize()
  }, [])

  return (
    <>
      <h1>Explore The Pokemon</h1>
      <hr />
      <div className='d-flex justify-content-center'>
        <Pagination>{pageItems}</Pagination>
      </div>
      <Row>
        {pokemon.results.map((poke) => {
          return (
            <Col sm={6} lg={2} key={poke.name} className="d-flex">
              <PokemonItem className="mb-4" pokemon={poke} />
            </Col>
          );
        })}
        {error && <h1>we got error</h1>}
      </Row>
      <div className='d-flex justify-content-center'>
        <Pagination>{pageItems}</Pagination>
      </div>
      <div style={{ height: '40px' }} />
    </>
  );
};

export default Explore;