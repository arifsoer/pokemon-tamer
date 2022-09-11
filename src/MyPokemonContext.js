import React, { useEffect, useState } from "react";
import store from 'store'

const STORE_KEY = 'myPokemon'

export const MyPokemonContext = React.createContext()

export const MyPokemonComponent = ({children}) => {
    const [myPokemons, setMyPokemon] = useState([])

    const addNewPokemon = (newPokemon) => {
        myPokemons.push(newPokemon)
        store.set(STORE_KEY, myPokemons)
        setMyPokemon(myPokemons)
    }

    const removePokemon = (removePokemon) => {
        const ind = myPokemons.indexOf(removePokemon)
        if (ind > -1) {
            myPokemons.splice(ind, 1)
        }
        store.set(STORE_KEY, myPokemons)
        setMyPokemon(myPokemons)
    }

    useEffect(() => {
        const storeData = store.get(STORE_KEY)

        if (storeData) {
            setMyPokemon(storeData)
        }
    }, [])

    return (
        <MyPokemonContext.Provider value={{myPokemons, addNewPokemon, removePokemon}}>
            {children}
        </MyPokemonContext.Provider>
    )
}