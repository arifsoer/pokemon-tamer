import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import Explore from "./pages/Explore/Explore";
import PokemonDetail from "./pages/PokemonDetail/PokemonDetail"
import MyPokemon from "./pages/MyPokemon/MyPokemon"
import PageNotFound from "./pages/PageNotFound";
import SideMenu from "./SideMenu";
import Navigationbar from "./Navbar";
import { MyPokemonComponent } from "./MyPokemonContext"

function App() {
  const [showSidebar, setShowSidebar] = useState(true);

  const handleShow = () => setShowSidebar(true);
  const handleClose = () => setShowSidebar(false);

  const minDesktopScreen = 992;

  useEffect(() => {
    const resizeHandler = () => {
      const isShowSidebar = window.innerWidth > minDesktopScreen;
      setShowSidebar(isShowSidebar);
    };
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  return (
    <BrowserRouter>
      <Navigationbar handleShow={handleShow} />
      <SideMenu showSidebar={showSidebar} handleClose={handleClose} />
      <Container className="main-body overflow-auto px-2 pt-2 me-2" fluid>
        <MyPokemonComponent>
          <Routes>
            <Route path="/" element={<Explore />} />
            <Route path="/pokemon-detail/:name" element={<PokemonDetail />} />
            <Route path="/my-pokemon" element={<MyPokemon />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </MyPokemonComponent>
      </Container>
    </BrowserRouter>
  );
}

export default App;
