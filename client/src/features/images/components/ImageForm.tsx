import React, { useState } from 'react';
import { Box, Button, CircularProgress, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { toast } from 'react-toastify';
import FileInput from '../../../components/FileInput/FileInput.tsx';
import { ImageMutation } from '../../../types';
import { useNavigate } from 'react-router-dom';
import { createImage, fetchImages } from '../imagesThunks.ts';

const ImageForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelector((state) => state.images);


  const [form, setForm] = useState({
    title: '',
    image: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm({ ...form, image: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const artistData: ImageMutation = {
      title: form.title,
      image: form.image ? form.image : null,
    };

    try {
      await dispatch(createImage(artistData)).unwrap();
      toast.success('Image created successfully!');
      setForm({ title: '', image: null });
      await dispatch(fetchImages());
      navigate('/');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: '500px',
        marginX: 'auto'
      }}
    >
      <TextField
        label="Title"
        name="title"
        value={form.title}
        onChange={handleChange}
        required
      />

      <FileInput name="image" label="Artist Image" onGetFile={handleFileChange} />
      <Button type="submit" variant="contained" color="primary" disabled={ loading }>
        {loading ? <CircularProgress size={24} /> : 'Create Artist'}
      </Button>
    </Box>
  );
};

export default ImageForm;
