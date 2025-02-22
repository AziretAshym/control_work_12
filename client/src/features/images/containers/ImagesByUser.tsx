import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { RootState } from '../../../app/store.ts';
import { fetchImagesByAuthor } from '../imagesThunks.ts';
import OneImage from '../components/OneImage.tsx';
import { useAppDispatch } from '../../../app/hooks.ts';
import { Image } from '../../../types';

const ImagesByUser: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();

  const dispatch = useAppDispatch();
  const { images, loading } = useSelector((state: RootState) => state.images);

  useEffect(() => {
    if (userId) {
      dispatch(fetchImagesByAuthor(userId));
    }
  }, [dispatch, userId]);


  return (
    <>
      <Typography variant="h4">Gallery</Typography>
      <Box sx={{ padding: "20px" }}>
        {loading ? (
          <CircularProgress sx={{ display: 'block', margin: 'auto' }} />
        ) : images.length === 0 ? (
          <Typography
            variant="h6"
            align="center"
            sx={{ color: "text.secondary", marginTop: "20px" }}
          >
            No Images Found
          </Typography>
        ) : (
          <Grid container spacing={3} sx={{ justifyContent: "center" }}>
            {images.map((image: Image) => (
              <OneImage
                key={image._id}
                _id={image._id}
                user={image.user}
                title={image.title}
                image={image.image}
              />
            ))}
          </Grid>
        )}
      </Box>
    </>
  );
};

export default ImagesByUser;
