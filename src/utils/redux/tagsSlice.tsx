import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Tag } from "../../App";

interface TagsState {
 tags: Tag[];
 hasMorePages: boolean;
 loading: boolean;
 error: string | null;
}

const initialState: TagsState = {
 tags: [],
 hasMorePages: true,
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
  },
  setHasMorePages: (state: TagsState, action: PayloadAction<boolean>) => {
   state.hasMorePages = action.payload;
  }
 }
});

export const { fetchTagsStart, fetchTagsSuccess, fetchTagsFailure, setHasMorePages } =
 tagsSlice.actions;

export const selectTags = (state: { tags: TagsState }) => state.tags.tags;
export const selectHasMorePages = (state: { tags: TagsState }) => state.tags.hasMorePages;
export const selectLoading = (state: { tags: TagsState }) => state.tags.loading;
export const selectError = (state: { tags: TagsState }) => state.tags.error;

export default tagsSlice.reducer;
