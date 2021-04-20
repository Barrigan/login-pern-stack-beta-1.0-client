import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null
    },
    reducers: {
        login(state, action) {
            state.user = action.payload
        },
        logout(state) {
            state.user = null
        },
        loadUserSession(state, action) {
            state.user = action.payload
        }
    }
})

export const { login, logout, loadUserSession } = authSlice.actions

export const checkUserLogged = state => state.auth.user

export default authSlice.reducer

