import { User } from '../../../types';
import React from 'react';
import { apiUrl } from '../../../globalConstants.ts';
import { Avatar, Card, CardContent, CardHeader, CardMedia, Typography } from '@mui/material';

interface Props {
  _id: string;
  user: User;
  title: string;
  image: string | null;
}

const OneImage: React.FC<Props> = ({ _id, title, image, user }) => {
  const cardImage = image ? `${apiUrl}/${image}` : '';
  const authorAvatar = user.avatar ? `${apiUrl}/${user.avatar}` : '';

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
      <CardContent>
        <Avatar
          src={authorAvatar}
          alt={user.displayName}
          sx={{ width: 56, height: 56, mx: "auto", mb: 1 }}
        />
        <Typography sx={{ textAlign: "center", fontWeight: 500 }}>
          {user.displayName}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default OneImage;
