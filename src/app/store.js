import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/user/authSlice'

//CODE TO SAVE INTO LOCAL STORAGE AND INFORMATION PERSISTS WHEN REFRESHING PAGE
function saveToLocalStorage(state) {
    try {
        const serializedState = JSON.stringify(state)
        localStorage.setItem('state', serializedState)
        console.log("SERIALIZED STATE: ", serializedState)
        console.log('state: ', store.getState())
    } catch (e) {
        console.log('error: ', e)
    }
}

const store = configureStore({
    reducer: {
        auth: authReducer
        //NOT WORKING!!! CODE TO SAVE INTO LOCAL STORAGE AND INFORMATION PERSISTS WHEN REFRESHING PAGE
        //preloadedState: preloadedState
    }
})

console.log('state: ', store.getState())

//CODE TO SAVE INTO LOCAL STORAGE AND INFORMATION PERSISTS WHEN REFRESHING PAGE
store.subscribe(() => saveToLocalStorage(store.getState()))


export default store