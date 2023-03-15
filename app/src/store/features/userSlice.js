import { createSlice } from '@reduxjs/toolkit'
// TODO: almacenar y obtener info desde localStorage
export const counterSlice = createSlice({
  name: 'user',
  initialState: {
    data: {
      firstName: '',
      lastName: '',
      email: ''
    },
    tokens: {
      accessToken: '',
      refreshToken: ''
    }
  },
  reducers: {
    setTokens: (state, { payload }) => {
      const { accessToken, refreshToken } = payload
      state.tokens.accessToken = accessToken
      state.tokens.refreshToken = refreshToken
      const { sessionUserData } = JSON.parse(window.atob(accessToken.split('.')[1]))
      const { firstName, lastName, email } = sessionUserData
      state.data.firstName = firstName
      state.data.lastName = lastName
      state.data.email = email
    },
    setUserData: (state, { payload }) => {
      const { firstName, lastName, email } = payload
      state.data.firstName = firstName
      state.data.lastName = lastName
      state.data.email = email
    },
    destroyUser: (state) => {
      state.data.firstName = ''
      state.data.lastName = ''
      state.data.email = ''
      state.tokens.accessToken = ''
      state.tokens.refreshToken = ''
    }
  }
})

// Action creators are generated for each case reducer function
export const { setTokens, setUserData, destroyUser } = counterSlice.actions

export default counterSlice.reducer
