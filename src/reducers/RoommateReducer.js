import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  roommate: {}
}

export const roommateSlice = createSlice({
  name: 'roommate',
  initialState,
  reducers: {
    setCurrentRoommate: (state, action) => {
      state.roommate = action.payload
    },
    clearCurrentRoommate: (state) => {
      state = {}
    }
  },
})

// Action creators are generated for each case reducer function
export const { setCurrentRoommate, clearCurrentRoommate } = roommateSlice.actions

export default roommateSlice.reducer