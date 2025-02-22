import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Image } from "../../types";
import {
  createImage,
  deleteImage,
  fetchImageById,
  fetchImages,
  fetchImagesByAuthor,
} from "./imagesThunks.ts";

interface ArtistsState {
  images: Image[];
  oneImage: Image | null;
  loading: boolean;
  error: string | null;
}

const initialState: ArtistsState = {
  images: [],
  oneImage: null,
  loading: false,
  error: null,
};

const imagesSlice = createSlice({
  name: "images",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchImages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchImages.fulfilled,
        (state, action: PayloadAction<Image[]>) => {
          state.images = action.payload;
          state.loading = false;
        },
      )
      .addCase(fetchImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch images";
      })

      .addCase(fetchImageById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchImageById.fulfilled, (state, action) => {
        state.loading = false;
        state.oneImage = action.payload;
      })
      .addCase(fetchImageById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch images";
      })

      .addCase(fetchImagesByAuthor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchImagesByAuthor.fulfilled,
        (state, action: PayloadAction<Image[]>) => {
          state.images = action.payload;
          state.loading = false;
        },
      )
      .addCase(fetchImagesByAuthor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch images";
      })

      .addCase(createImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createImage.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create image";
      })
      .addCase(deleteImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteImage.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create image";
      });
  },
});

export const imagesReducer = imagesSlice.reducer;
