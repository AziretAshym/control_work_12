import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Avatar, Box, Card, CardContent, CardHeader, CardMedia, CircularProgress, IconButton, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { RootState } from '../../../app/store.ts';
import { deleteImage, fetchImagesByAuthor } from '../imagesThunks.ts';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { Image } from '../../../types';
import { Delete } from '@mui/icons-material';
import { apiUrl } from '../../../globalConstants.ts';

const ImagesByUser: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();

  const dispatch = useAppDispatch();
  const { images, loading } = useSelector((state: RootState) => state.images);
  const user = useAppSelector((state) => state.users.user);

  useEffect(() => {
    if (userId) {
      dispatch(fetchImagesByAuthor(userId));
    }
  }, [dispatch, userId]);

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteImage(id));
      await dispatch(fetchImagesByAuthor(userId as string));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Typography variant="h4">Paintings by the <strong>{user?.displayName}</strong></Typography>
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
            {images.map((image: Image) => {
              const cardImage = image.image ? `${apiUrl}/${image.image}` : '';
              const authorAvatar = image.user.avatar ? `${apiUrl}/${image.user.avatar}` : '';

              return (
                <Grid key={image._id}>
                  <Card
                    sx={{
                      width: 350,
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: "16px",
                      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={cardImage}
                      title={image.title}
                      sx={{
                        height: 270,
                        borderRadius: "16px 16px 0 0",
                      }}
                    />
                    <CardHeader
                      title={
                        <Typography variant="h6" sx={{ textAlign: "center", fontWeight: 600 }}>
                          {image.title}
                        </Typography>
                      }
                    />
                    <CardContent sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center"
                    }}>
                      <Avatar
                        src={authorAvatar}
                        alt={image.user.displayName}
                        sx={{ width: 56, height: 56, mx: "auto", mb: 1 }}
                      />
                      <Link to={`/images-by-author/${image.user._id}`} style={{ textDecoration: 'none' }}>
                        {image.user.displayName}
                      </Link>
                      {(user && (user._id === image.user._id)) && (
                        <IconButton
                          sx={{
                            backgroundColor: "error.main",
                            color: "#fff",
                            mt: 1
                          }}
                          onClick={() => handleDelete(image._id)}
                          disabled={loading}
                        >
                          <Delete />
                        </IconButton>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Box>
    </>
  );
};

export default ImagesByUser;
