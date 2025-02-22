import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { Image } from '../../../types';
import { useEffect } from 'react';
import { fetchImages } from '../imagesThunks.ts';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import OneImage from '../components/OneImage.tsx';

const Images = () => {
  const dispatch = useAppDispatch();
  const images: Image[] = useAppSelector((state) => state.images.images);

  useEffect(() => {
    dispatch(fetchImages());
  }, [dispatch]);

  return (
    <>
      <Typography variant="h4">
        Gallery
      </Typography>
      <Box sx={{ padding: "20px" }}>
        {images.length === 0 ? (
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

export default Images;
