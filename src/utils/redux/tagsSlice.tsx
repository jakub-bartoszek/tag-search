import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Tag } from "../../App";

interface TagsState {
 tags: Tag[];
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
  fetchTagsStart: (
   state: TagsState,
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   _action: PayloadAction<{ pageSize: string; order: string; inName: string; page: string }>
  ) => {
   state.loading = true;
   state.error = null;
  },
  fetchTagsSuccess: (state: TagsState, action: PayloadAction<Tag[]>) => {
   state.loading = false;
   state.tags = action.payload;
  },
  fetchTagsFailure: (state: TagsState, action: PayloadAction<string>) => {
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
