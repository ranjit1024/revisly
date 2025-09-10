import { configureStore} from "@reduxjs/toolkit";
import { sessionSlice } from "./slices/revison";
export const store = configureStore({
    reducer:{
        revision:sessionSlice.reducer,
    }
});
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch