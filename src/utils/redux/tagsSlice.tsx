import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TagsState {
 tags: string[];
 loading: boolean;
 error: string | null;
}

const initialState: TagsState = {
 tags: [],
 loading: false,
 error: null
};

const tagsSlice = createSlice({
 name: "tags",
 initialState,
 reducers: {
  fetchTagsStart(state) {
   state.loading = true;
   state.error = null;
  },
  fetchTagsSuccess(state, action: PayloadAction<string[]>) {
   state.loading = false;
   state.tags = action.payload;
  },
  fetchTagsFailure(state, action: PayloadAction<string>) {
   state.loading = false;
   state.error = action.payload;
  }
 }
});

export const { fetchTagsStart, fetchTagsSuccess, fetchTagsFailure } = tagsSlice.actions;

export const selectTags = (state: { tags: TagsState }) => state.tags.tags;
export const selectLoading = (state: { tags: TagsState }) => state.tags.loading;
export const selectError = (state: { tags: TagsState }) => state.tags.error;

export default tagsSlice.reducer;
