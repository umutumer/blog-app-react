import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Comments } from "../../types/types";


export const fetchComments = createAsyncThunk(
    "/comments",
    async () => {
        const response = await fetch("http://localhost:3005/comments")
        return await response.json();
    }
);

export const addComment = createAsyncThunk(
    "comments/addComment",
    async (newComment: Omit<Comments, "id">) => {
        const response = await fetch("http://localhost:3005/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newComment),
        });
        return await response.json();
    }
);

export const deleteComment = createAsyncThunk(
    "comments/deleteComment",
    async (commentId: string) => {
        await fetch(`http://localhost:3005/comments/${commentId}`, {
            method: "DELETE",
        });
        return commentId;
    }
);


interface CommentState {
    entities: Comments[];
    loading: "idle" | "pending" | "succeeded" | "failed";
    error: string | null;
}

const initialState: CommentState = {
    entities: [],
    loading: "idle",
    error: null
}

export const CommentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchComments.pending, (state) => {
                state.loading = "pending";
            })
            .addCase(fetchComments.fulfilled, (state, action: PayloadAction<Comments[]>) => {
                state.loading = "succeeded";
                state.entities = action.payload;
            })
            .addCase(fetchComments.rejected, (state, action) => {
                state.loading = "failed";
                state.error = action.error.message || "Something went wrong";
            })
            .addCase(addComment.fulfilled, (state, action: PayloadAction<Comments>) => {
                state.entities.push(action.payload);
            })
            .addCase(deleteComment.fulfilled, (state, action: PayloadAction<string>) => {
                state.entities = state.entities.filter((comment) => comment.id !== action.payload);
            })
    },
})

export default CommentSlice.reducer;