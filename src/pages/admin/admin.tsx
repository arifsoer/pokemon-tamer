import React from "react";
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import {useState, useEffect} from 'react'

import Navigationbar from "./Navbar";
import SideMenu from "./SideMenu";
import { MyPokemonComponent } from "../../MyPokemonContext";
import Explore from './Explore/Explore'
import PokemonDetail from './PokemonDetail/PokemonDetail'
import MyPokemon from './MyPokemon/MyPokemon'
import PageNotFound from './PageNotFound'

const AdminPage = () => {
  const [showSidebar, setShowSidebar] = useState<boolean>(true);

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

  const routeList = [
    {
      path: "/",
      element: <Explore />,
    },
    {
      path: "/pokemon-detail/:name",
      element: <PokemonDetail />,
    },
    {
      path: "/my-pokemon",
      element: <MyPokemon />,
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ];

  return (
    <>
      <Navigationbar handleShow={handleShow} />
      <SideMenu showSidebar={showSidebar} handleClose={handleClose} />
      <Container className="main-body overflow-auto px-2 pt-2 me-2" fluid>
        <MyPokemonComponent>
          <Routes>
            {routeList.map((rl) => (
              <Route path={rl.path} element={rl.element} key={rl.path} />
            ))}
          </Routes>
        </MyPokemonComponent>
      </Container>
    </>
  );
};

export default AdminPage;
