import { createSlice } from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'

export interface PokemonState {
  value: PokemonInterface[]
}

const initialState: PokemonState = {
  value: []
}

export const pokemonDataHandle = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    addNewPokemon: (state, action: PayloadAction<PokemonInterface>) => {
      const newPokemon = action.payload
      const find = state.value.findIndex(poke => poke.name === newPokemon.name)
      if (find <= -1) {
        state.value.push(newPokemon)
      }
    },
    removePokemon: (state, action) => {
      const myPokemon = action.payload
      const ind = state.value.findIndex(poke => poke.name === myPokemon.name)
      if (ind > -1) {
        state.value.splice(ind, 1)
      }
    }
  }
})

export const {addNewPokemon, removePokemon} = pokemonDataHandle.actions

export default pokemonDataHandle.reducer