import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import postService from "./postService";

export interface IPostCreate {
  text: string;
  image: string;
  token: string;
}

export interface IPostDelete {
  postId: string;
  token: string;
}

interface IPostProfile {
  id: string;
  username: string;
  profile_image: string;
  firstName: string;
  lastName: string;
}

interface IPost {
  text: string;
  image: string | null;
  id: string;
  created_at: string;
  likesCount: number;
  profile: IPostProfile;
}

interface IPostState {
  posts: IPost[];
  postsProfile: IPost[];
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
}

const initialState: IPostState = {
  posts: [],
  postsProfile: [],
  isLoading: false,
  message: "",
  isError: false,
  isSuccess: false,
};

interface IPostDeletePayload {
  message: string;
  postId: string;
}

export const createPost = createAsyncThunk(
  "post/createPost",
  async (post: IPostCreate, thunkAPI) => {
    try {
      return await postService.createPost(post);
    } catch (error: any) {
      const message = error.response.data.message;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllPosts = createAsyncThunk(
  "post/getAllPosts",
  async (posts, thunkAPI) => {
    try {
      return await postService.getAllPosts();
    } catch (error: any) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllPostsByProfileId = createAsyncThunk(
  "post/getAllPostsByProfileId",
  async (profileId: string, thunkAPI) => {
    try {
      return await postService.getAllPostsByProfileId(profileId);
    } catch (error: any) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (deletePostData: IPostDelete, thunkAPI) => {
    try {
      return await postService.deletePost(deletePostData);
    } catch (error: any) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    reset: (state: IPostState) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state: IPostState) => {
        state.isLoading = true;
        state.message = "";
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(
        createPost.fulfilled,
        (state: IPostState, action: PayloadAction<IPost>) => {
          state.isLoading = false;
          state.isSuccess = false;
          state.posts = [action.payload, ...state.posts];
          state.postsProfile = [action.payload, ...state.postsProfile];
          state.isError = false;
          state.message = "";
        }
      )
      .addCase(createPost.rejected, (state: IPostState, { payload }: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
        state.isSuccess = false;
      })
      .addCase(getAllPosts.pending, (state: IPostState) => {
        state.isLoading = true;
        state.message = "";
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(
        getAllPosts.fulfilled,
        (state: IPostState, action: PayloadAction<IPost[]>) => {
          state.isLoading = false;
          state.isSuccess = false;
          state.posts = action.payload;
          state.isError = false;
          state.message = "";
        }
      )
      .addCase(getAllPosts.rejected, (state: IPostState, { payload }: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
        state.isSuccess = false;
      })
      .addCase(deletePost.pending, (state: IPostState) => {
        state.isLoading = true;
        state.message = "";
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(
        deletePost.fulfilled,
        (state: IPostState, action: PayloadAction<IPostDeletePayload>) => {
          state.isLoading = false;
          state.isSuccess = false;
          state.posts = state.posts.filter(
            (post) => post.id !== action.payload.postId
          );
          state.postsProfile = state.postsProfile.filter(
            (post) => post.id !== action.payload.postId
          );
          state.isError = false;
          state.message = action.payload.message;
        }
      )
      .addCase(deletePost.rejected, (state: IPostState, { payload }: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
        state.isSuccess = false;
      })
      .addCase(getAllPostsByProfileId.pending, (state: IPostState) => {
        state.isLoading = true;
        state.message = "";
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(
        getAllPostsByProfileId.fulfilled,
        (state: IPostState, action: PayloadAction<IPost[]>) => {
          state.isLoading = false;
          state.isSuccess = false;
          state.postsProfile = action.payload;
          state.isError = false;
          state.message = "";
        }
      )
      .addCase(
        getAllPostsByProfileId.rejected,
        (state: IPostState, { payload }: any) => {
          state.isLoading = false;
          state.isError = true;
          state.message = payload;
          state.isSuccess = false;
        }
      );
  },
});

export const { reset } = postSlice.actions;

export default postSlice.reducer;
