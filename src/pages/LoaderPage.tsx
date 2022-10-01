import { Container } from "react-bootstrap";

import Spinner from "../components/spinner/spinner";

const LoaderPage = () => {
  return (
    <Container fluid>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner />
      </div>
    </Container>
  );
};

export default LoaderPage;
