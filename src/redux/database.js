import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../plugins/api";

// the thunk
export const fetchAllPokemon = createAsyncThunk('database/fetchAllPokemon', async () => {
  const response = await api.get('/pokemon?limit=1154')
  return response.data
})

export const fetchAllType = createAsyncThunk('databse/fetchAllType', async () => {
  const response = await api.get('/type')
  return response.data
})

export const fetchSinglePokemon = createAsyncThunk(
  'database/fetchSinglePokemin',
  async (pokemonName) => {
    const response = await api.get(`/pokemon/${pokemonName}`)
    return response.data
  }
)

export const sliceDatabase = createSlice({
  name: 'database',
  initialState: {
    allPokemon: [],
    allType: []
  },
  reducers: {
    setAllPokemon: (state, action) => {
      state.allPokemon = action.payload
    },
    setAllType: async (state, action) => {
      state.allType = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllPokemon.fulfilled, (state, action) => {
      state.allPokemon = action.payload.results
    })
    builder.addCase(fetchAllType.fulfilled, (state, action) => {
      state.allType = action.payload.results
    })
    builder.addCase(fetchSinglePokemon.fulfilled, (state, action) => {
      const result = action.payload
      const index = state.allPokemon.findIndex(x => result.name === x.name)
      state.allPokemon[index].sprites =result.sprites
    })
  }
})

export const { setAllPokemon, setAllType } = sliceDatabase.actions



export default sliceDatabase.reducer