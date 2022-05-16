import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  house: {},
  search: {}
}

export const houseSlice = createSlice({
  name: 'house',
  initialState,
  reducers: {
    setSearchedHouse: (state, action) => {
      state.search = action.payload
    },
    clearSearchedHouse: (state) => {
      state = {}
    }
  },
})

// Action creators are generated for each case reducer function
export const { setSearchedHouse, clearSearchedHouse } = houseSlice.actions

export default houseSlice.reducer