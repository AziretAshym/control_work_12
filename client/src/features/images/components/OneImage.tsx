import { User } from '../../../types';
import React from 'react';
import { apiUrl } from '../../../globalConstants.ts';
import { Avatar, Card, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { deleteImage, fetchImages } from '../imagesThunks.ts';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { Delete } from '@mui/icons-material';

interface Props {
  _id: string;
  user: User;
  title: string;
  image: string | null;
}

const OneImage: React.FC<Props> = ({ _id, title, image, user }) => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.users.user);
  const loading = useAppSelector((state) => state.images.loading);

  const cardImage = image ? `${apiUrl}/${image}` : '';
  const authorAvatar = user.avatar ? `${apiUrl}/${user.avatar}` : '';

  const handleDelete = async () => {
    try {
      if (currentUser && (currentUser.role === 'admin')) {
        await dispatch(deleteImage(_id));
        await dispatch(fetchImages());
      } else {
        console.error("You can not delete this image!");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Card
      sx={{
        width: 350,
        display: "flex",
        flexDirection: "column",
        borderRadius: "16px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      }}
      key={_id}
    >
      <CardMedia
        component="img"
        image={cardImage}
        title={title}
        sx={{
          height: 270,
          borderRadius: "16px 16px 0 0",
        }}
      />
      <CardHeader
        title={
          <Typography variant="h6" sx={{ textAlign: "center", fontWeight: 600 }}>
            {title}
          </Typography>
        }
      />
      <CardContent sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <Avatar
          src={authorAvatar}
          alt={user.displayName}
          sx={{ width: 56, height: 56, mx: "auto", mb: 1 }}
        />
        <Link to={`/images-by-author/${user._id}`} style={{ textDecoration: 'none' }}>
          {user.displayName}
        </Link>
        {(currentUser && (currentUser.role === 'admin')) && (
          <IconButton
            sx={{
              backgroundColor: "error.main",
              color: "#fff",
            }}
            onClick={handleDelete}
            disabled={loading}
          >
            <Delete />
          </IconButton>
        )}
      </CardContent>
    </Card>
  );
};

export default OneImage;
