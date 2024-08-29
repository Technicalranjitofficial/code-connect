import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


// Define a type for the slice state
interface CodeState {
  value: number
}

// Define the initial state using that type
const initialState: CodeState = {
  value: 0,
}

export const codeSlice = createSlice({
  name: 'codeReducer',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
   
  },
})

export const {  } = codeSlice.actions
export default codeSlice.reducer