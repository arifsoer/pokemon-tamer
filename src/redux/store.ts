import { combineReducers, configureStore, Action } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import { ThunkAction } from 'redux-thunk'

import pokemonReducer, {PokemonState} from './pokemon'
import databaseReducer from './database'

import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2'

const persistedConfig = {
  key: 'myPokemon',
  storage,
  stateReconciler: autoMergeLevel2
}

const persistedMyPokemonReducer = persistReducer<PokemonState>(persistedConfig, pokemonReducer)

const combinedReducer = combineReducers({
  myPokemon: persistedMyPokemonReducer,
  database: databaseReducer
})

const mystore = configureStore({
  reducer: combinedReducer,
  // middleware: [thunk]
})

const persistedStore = persistStore(mystore)

export type AppDispatch = typeof mystore.dispatch
export type RootState = ReturnType<typeof mystore.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export { persistedStore, mystore }