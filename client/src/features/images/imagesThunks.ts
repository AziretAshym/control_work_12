import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import axiosApi from '../../axiosApi.ts';
import { Image } from '../../types';

export const fetchImages = createAsyncThunk<Image[], void, { state: RootState }>(
  "images/fetchImages",
  async () => {
    const response = await axiosApi.get(`/images`);
    return response.data;
  }
);