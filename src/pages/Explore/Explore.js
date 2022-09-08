/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { Row, Col } from "react-bootstrap";

import { useGetApi } from '../../hooks/useApi'

import PokemonItem from "./PokemonItem";

const Explore = () => {
  const [pokemon, setPokemon] = useState([]);
  const [getPokemonData, error] = useGetApi({baseUrl: '/pokemon'})

  useEffect(() => {
    const thePokemonsData = getPokemonData()
    setPokemon(thePokemonsData)
  }, [])

  return (
    <>  
      <h1>Explore The Pokemon</h1>
      <hr />
      <Row>
        {pokemon.results.map((i) => {
          return (
            <Col sm={6} lg={2} key={i} className="d-flex">
              <PokemonItem className="mb-4" />
            </Col>
          );
        })}
        {error && <h1>we got error</h1>}
      </Row>
    </>
  );
};

export default Explore;