import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Blog } from "../../types/types";

export const fetchBlogs = createAsyncThunk(
  "blogs/fetchBlogs",
  async () => {
    const response = await fetch("http://localhost:3005/blogs");
    return await response.json();
  }
);

export const updateBlog = createAsyncThunk(
  "blogs/updateBlog",
  async (updatedBlog: Blog) => {
    await fetch(`http://localhost:3005/blogs/${updatedBlog.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedBlog),
    });
    return updatedBlog;
  }
);

export const addBlog = createAsyncThunk(
  "blogs/addBlog",
  async (newBlog: Omit<Blog, "id">) => {
    const response = await fetch("http://localhost:3005/blogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBlog),
    });
    return await response.json();
  }
);

export const deleteBlog = createAsyncThunk(
  "blogs/deleteBlog",
  async (blogId: string) => {
    await fetch(`http://localhost:3005/blogs/${blogId}`, {
      method: "DELETE",
    });
    return blogId;
  }
);

interface BlogState {
  entities: Blog[];
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

const initialState: BlogState = {
  entities: [],
  loading: "idle",
  error: null,
};

export const BlogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchBlogs.fulfilled, (state, action: PayloadAction<Blog[]>) => {
        state.loading = "succeeded";
        state.entities = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(updateBlog.fulfilled, (state, action: PayloadAction<Blog>) => {
        const index = state.entities.findIndex((blog) => blog.id === action.payload.id);
        if (index !== -1) {
          state.entities[index] = action.payload;
        }
      })
      .addCase(addBlog.fulfilled, (state, action: PayloadAction<Blog>) => {
        state.entities.push(action.payload);
      })
      .addCase(deleteBlog.fulfilled, (state, action: PayloadAction<string>) => {
        state.entities = state.entities.filter((blog) => blog.id !== action.payload);
      });
  },
});

export default BlogSlice.reducer;
