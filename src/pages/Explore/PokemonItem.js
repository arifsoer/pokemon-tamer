/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Alert, Button, Card } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux'

import { useGetApi } from "../../hooks/useApi";
import { addNewPokemon, removePokemon } from "../../redux/pokemon"

const PokemonItem = ({ className, pokemon }) => {
  const [pokemonData, setPokemonData] = useState(null)

  const { doRequest: getData, error } = useGetApi({ baseUrl: `/pokemon/${pokemon.name}` })

  const myPokemons = useSelector(state => state.pokemon.value)
  const disppatch = useDispatch()

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

  const buttonCatchRelease = isAlreadyCatch ? 
    <Button variant="danger" size="sm" onClick={() => disppatch(removePokemon(pokemon))}>
      Release
    </Button> : 
    <Button variant="primary" size="sm" onClick={() => disppatch(addNewPokemon(pokemon))}>
      Catch
    </Button>

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
          {buttonCatchRelease}
        </Card.Body>
      </>}
    </Card>
  );
};

export default PokemonItem;
