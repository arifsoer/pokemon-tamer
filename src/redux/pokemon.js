import { createSlice } from '@reduxjs/toolkit'

export const pokemonDataHandle = createSlice({
  name: 'pokemon',
  initialState: {
    value: []
  },
  reducers: {
    addNewPokemon: (state, action) => {
      const newPokemon = action.payload
      const find = state.value.findIndex(poke => poke.name === newPokemon)
      if (find <= -1) {
        state.value.push(newPokemon)
      }
    },
    removePokemon: (state, action) => {
      const myPokemon = action.payload
      const ind = state.value.indexOf(myPokemon)
      console.log(myPokemon)
      if (ind > -1) {
        state.value = state.value.splice(ind, 1)
      }
    }
  }
})

export const {addNewPokemon, removePokemon} = pokemonDataHandle.actions

export default pokemonDataHandle.reducer