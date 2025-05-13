import { LoadingActionReducer } from "@/src/entities/loadingAction";
import { UserReducer } from "@/src/entities/user";
import { combineReducers, configureStore } from "@reduxjs/toolkit";


const rootReducer = combineReducers({
    UserReducer,
    LoadingActionReducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']