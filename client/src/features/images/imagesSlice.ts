import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Image } from '../../types';
import { fetchImages } from './imagesThunks.ts';

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
  },
});

export const imagesReducer = imagesSlice.reducer;
