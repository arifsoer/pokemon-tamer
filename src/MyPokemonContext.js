import React, { useState } from "react";

export const MyPokemonContext = React.createContext()

export const MyPokemonComponent = ({children}) => {
    const [myPokemons, setMyPokemon] = useState([])

    const addNewPokemon = (newPokemon) => {
        myPokemons.push(newPokemon)
        setMyPokemon(myPokemons)
    }

    const removePokemon = (removePokemon) => {
        const ind = myPokemons.indexOf(removePokemon)
        if (ind > -1) {
            myPokemons.splice(ind, 1)
        }
        setMyPokemon(myPokemons)
    }

    return (
        <MyPokemonContext.Provider value={{myPokemons, addNewPokemon, removePokemon}}>
            {children}
        </MyPokemonContext.Provider>
    )
}