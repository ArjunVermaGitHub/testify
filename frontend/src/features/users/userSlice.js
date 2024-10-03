import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {user:""},
    reducers: {
      setUser: (state, action) => {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
        state.user = action.payload
      },
      // addQuizToUser: (state, action)=>{
      //   state.user[action.payload]={}
      // }
    },
  })
  
export const { setUser, addQuizToUser } = userSlice.actions

export default userSlice.reducer