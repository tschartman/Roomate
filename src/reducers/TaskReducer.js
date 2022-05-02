import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  task: {},
}

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setTask: (state, action) => {
      state.task = action.payload
    },
    clearTask: (state) => {
      state.task = {}
    }
  },
})

// Action creators are generated for each case reducer function
export const { setTask, clearTask } = taskSlice.actions

export default taskSlice.reducer