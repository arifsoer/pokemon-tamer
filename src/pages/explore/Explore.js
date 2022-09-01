import { Row, Col } from "react-bootstrap";

import PokemonItem from "./PokemonItem";

const Explore = () => {
  return (
    <>
      <h1>Explore The Pokemon</h1>
      <hr />
      <Row>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
          return (
            <Col sm={6} lg={2} key={i} className="d-flex">
              <PokemonItem className="mb-4" />
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default Explore;
