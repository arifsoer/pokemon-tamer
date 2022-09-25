/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux'

import { addNewPokemon, removePokemon } from "../../../redux/pokemon"
import { fetchSinglePokemon } from "../../../redux/database"

const PokemonItem = ({ className, pokemon }) => {

  const myPokemons = useSelector(state => state.myPokemon.value)
  const dispatch = useDispatch()

  const initializeData = async () => {
    if (Object.keys(pokemon).length <= 2) {
      dispatch(fetchSinglePokemon(pokemon.name))
    }
  }

  useEffect(() => {
    initializeData()
  }, [])

  const isAlreadyCatch = myPokemons.map(p => p.name).includes(pokemon.name)

  const buttonCatchRelease = isAlreadyCatch ?
    <Button variant="danger" size="sm" onClick={() => dispatch(removePokemon(pokemon))}>
      Release
    </Button> :
    <Button variant="primary" size="sm" onClick={() => dispatch(addNewPokemon(pokemon))}>
      Catch
    </Button>

  return (
    <Card className={className}>
      {pokemon.sprites && <>
        <Card.Img
          src={pokemon.sprites.other["official-artwork"].front_default}
        />
        <Card.Body className="pb-0">
          <Card.Title>{pokemon.name.toUpperCase()}</Card.Title>
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

export default React.memo(PokemonItem);
