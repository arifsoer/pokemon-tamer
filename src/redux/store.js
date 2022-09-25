import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import thunk from 'redux-thunk'

import pokemonReducer from './pokemon'
import databaseReducer from './database'

import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2'


const persistedConfig = {
  key: 'myPokemon',
  storage,
  stateReconciler: autoMergeLevel2
}

const persistedMyPokemonReducer = persistReducer(persistedConfig, pokemonReducer)

const combinedReducer = combineReducers({
  myPokemon: persistedMyPokemonReducer,
  database: databaseReducer
})


const mystore = configureStore({
  reducer: combinedReducer,
  middleware: [thunk]
})

const persistedStore = persistStore(mystore)

export { persistedStore, mystore }