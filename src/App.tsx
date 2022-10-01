/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

import "./App.css";

import { useAppDispatch, useAppSelector } from "./redux/hooks";

import AdminPage from "./pages/admin/admin";
import LoaderPage from "./pages/LoaderPage";

import { fetchAllPokemon, fetchAllType } from "./redux/database";

function App() {
  const dispatch = useAppDispatch();
  const allPokemon = useAppSelector((state) => state.database.allPokemon);
  const allType = useAppSelector((state) => state.database.allType);

  const loaded = allPokemon.length > 0 && allType.length > 0;

  useEffect(() => {
    if (allPokemon.length === 0) {
      dispatch(fetchAllPokemon());
    }
    if (allType.length === 0) {
      dispatch(fetchAllType());
    }
  }, []);

  return (
    <BrowserRouter basename="/pokemon-tamer">
      {loaded ? <AdminPage /> : <LoaderPage />}
    </BrowserRouter>
  );
}

export default App;
