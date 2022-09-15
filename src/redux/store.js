import { configureStore } from '@reduxjs/toolkit'
import pokemonReducer from './pokemon'

export default configureStore({
  reducer: {
    pokemon: pokemonReducer
  }
})