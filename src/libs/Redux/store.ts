import { configureStore } from "@reduxjs/toolkit";
import blogReducer from './BlogSlice'
import commentReducer from './CommentSlice'
export const store = configureStore({
    reducer:{
        blogs:blogReducer,
        comments:commentReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;