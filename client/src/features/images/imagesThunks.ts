import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store.ts";
import axiosApi from "../../axiosApi.ts";
import { Image, ImageMutation } from "../../types";

export const fetchImages = createAsyncThunk<
  Image[],
  void,
  { state: RootState }
>("images/fetchImages", async () => {
  const response = await axiosApi.get(`/images`);
  return response.data;
});

export const fetchImageById = createAsyncThunk<
  Image,
  string,
  { state: RootState }
>("images/fetchImageById", async (id) => {
  const response = await axiosApi.get(`/images/${id}`);
  return response.data;
});

export const fetchImagesByAuthor = createAsyncThunk(
  "images/fetchImagesByAuthor",
  async (userId: string) => {
    try {
      const response = await axiosApi.get(`/images?user_id=${userId}`);
      return response.data;
    } catch (e) {
      console.error(e);
    }
  },
);

export const createImage = createAsyncThunk<
  void,
  ImageMutation,
  { state: RootState }
>("images/createImage", async (imageMutation, { getState }) => {
  const token = getState().users.user?.token;

  if (!token) {
    console.error("No token found");
    return;
  }

  const formData = new FormData();
  const keys = Object.keys(imageMutation) as (keyof ImageMutation)[];

  keys.forEach((key) => {
    const value = imageMutation[key];
    if (value !== null) {
      formData.append(key, value instanceof File ? value : String(value));
    }
  });

  try {
    await axiosApi.post("/images", formData, {
      headers: {
        Authorization: token,
      },
    });
  } catch (e) {
    console.error("Error creating image:", e);
  }
});

export const deleteImage = createAsyncThunk<void, string, { state: RootState }>(
  "images/deleteImage",
  async (imageId, { getState }) => {
    const token = getState().users.user?.token;

    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      await axiosApi.delete(`/images/${imageId}`, {
        headers: {
          Authorization: token,
        },
      });
    } catch (e) {
      console.error("Error deleting cocktail:", e);
    }
  },
);
