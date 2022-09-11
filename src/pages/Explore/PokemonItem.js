/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { Alert, Button, Card } from "react-bootstrap";

import { useGetApi } from "../../hooks/useApi";

import { MyPokemonContext } from "../../MyPokemonContext"

const PokemonItem = ({ className, pokemon }) => {
  const [pokemonData, setPokemonData] = useState(null)

  const {doRequest: getData, error} = useGetApi({ baseUrl: `/pokemon/${pokemon.name}` })

  const { addNewPokemon, myPokemons } = useContext(MyPokemonContext)

  const initializeData = async () => {
    try {
      const result = await getData()
      setPokemonData(result)
    } catch (error) {
      alert(error)
    }
  }

  useEffect(() => {
    initializeData()
  }, [])

  const isAlreadyCatch = myPokemons.map(p => p.name).includes(pokemon.name)

  return (
    <Card className={className}>
      {error && <><Alert variant="danger">{error}</Alert></>}
      {pokemonData && <>
        <Card.Img
          src={pokemonData.sprites.other["official-artwork"].front_default}
        />
        <Card.Body className="pb-0">
          <Card.Title>{pokemonData.name.toUpperCase()}</Card.Title>
        </Card.Body>
        <Card.Body className="pt-0 d-flex justify-content-between">
          <Button variant="success" size="sm">
            Details
          </Button>
          {!isAlreadyCatch && <Button variant="primary" size="sm" onClick={() => addNewPokemon(pokemon)}>
            Catch
          </Button>}
        </Card.Body>
      </>}
    </Card>
  );
};

export default PokemonItem;
