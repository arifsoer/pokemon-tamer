import { useContext } from 'react';
import { Row, Col } from 'react-bootstrap'

import { MyPokemonContext } from '../../MyPokemonContext';
import PokemonItem from '../Explore/PokemonItem';

const MyPokemon = () => {
  const { myPokemons } = useContext(MyPokemonContext)
  return (
    <>
      <h1>My Pokemon List</h1>
      <hr />
      <Row>
        {myPokemons.length <= 0 ? <h3 className='text-center'>Catch pokemon first</h3> : ''}
        {myPokemons.map(pokemon => <Col sm={6} lg={2} key={pokemon.name} className="d-flex">
          <PokemonItem className="mb-4" pokemon={pokemon} />
        </Col>)}
      </Row>
    </>
  )
};

export default MyPokemon;
