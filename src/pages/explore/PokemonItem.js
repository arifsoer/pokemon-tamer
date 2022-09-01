import { Button, Card } from "react-bootstrap";

import { bulbasaur } from "../../dummydata";

const PokemonItem = ({ className }) => {
  return (
    <Card className={className}>
      <Card.Img
        src={bulbasaur.sprites.other["official-artwork"].front_default}
      />
      <Card.Body className="pb-0">
        <Card.Title >{bulbasaur.name.toUpperCase()}</Card.Title>
      </Card.Body>
      <Card.Body className="pt-0 d-flex justify-content-end">
        <Button variant="primary" size="sm" className="">
          Catch
        </Button>
      </Card.Body>
    </Card>
  );
};

export default PokemonItem;
