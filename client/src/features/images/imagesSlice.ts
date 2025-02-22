import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Image } from '../../types';
import { createImage, fetchImages } from './imagesThunks.ts';

interface ArtistsState {
  images: Image[];
  loading: boolean;
  error: string | null;
}

const initialState: ArtistsState = {
  images: [],
  loading: false,
  error: null,
};

const imagesSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchImages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchImages.fulfilled, (state, action: PayloadAction<Image[]>) => {
        state.images = action.payload;
        state.loading = false;
      })
      .addCase(fetchImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch artists';
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
        state.error = action.error.message || 'Failed to create image';
      })
  },
});

export const imagesReducer = imagesSlice.reducer;
