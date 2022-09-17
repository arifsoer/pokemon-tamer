import { combineReducers, configureStore } from '@reduxjs/toolkit'
import pokemonReducer from './pokemon'
import { persistReducer, persistStore } from 'redux-persist'
import thunk from 'redux-thunk'

import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2'


const persistedConfig = {
  key: 'myPokemon',
  storage,
  stateReconciler: autoMergeLevel2
}

const rootReducer = combineReducers({
  pokemon: pokemonReducer
})

const persistedReducer = persistReducer(persistedConfig, rootReducer)

const mystore = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
})

const persistedStore = persistStore(mystore)

export { persistedStore, mystore }