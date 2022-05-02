import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  authenticated: true,
}

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setAuthentication: (state, action) => {
      state.authenticated = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setAuthentication } = authenticationSlice.actions

export default authenticationSlice.reducer
