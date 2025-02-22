import { User, Image } from "../../../types";
import React, { useEffect, useState } from "react";
import { apiUrl } from "../../../globalConstants.ts";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { deleteImage, fetchImageById, fetchImages } from "../imagesThunks.ts";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import { Delete } from "@mui/icons-material";
import ModalWindow from "./ModalWindow.tsx";

interface Props {
  _id: string;
  user: User;
  title: string;
  image: Image | null;
}

const OneImage: React.FC<Props> = ({ _id, title, image, user }) => {
  const { imageId } = useParams();

  const [openModal, setOpenModal] = useState(false);

  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.users.user);
  const loading = useAppSelector((state) => state.images.loading);

  useEffect(() => {
    if (imageId) {
      dispatch(fetchImageById(imageId));
    }
  }, [dispatch, imageId]);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const cardImage = image ? `${apiUrl}/${image.image}` : "";
  const authorAvatar = user.avatar ? `${apiUrl}/${user.avatar}` : "";

  const handleDelete = async () => {
    try {
      if (currentUser && currentUser.role === "admin") {
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
    <>
      <Card
        sx={{
          width: 350,
          display: "flex",
          flexDirection: "column",
          borderRadius: "16px",
          backgroundColor: "#1E1E1E",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
        }}
        key={_id}
      >
        <CardMedia
          component="img"
          image={cardImage}
          title={title}
          onClick={handleOpenModal}
          sx={{
            height: 270,
            borderRadius: "16px 16px 0 0",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            cursor: "pointer",
          }}
        />
        <CardHeader
          title={
            <Typography
              variant="h6"
              sx={{
                textAlign: "center",
                fontWeight: 600,
                color: "#E0E0E0",
              }}
            >
              {title}
            </Typography>
          }
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <Avatar
            src={authorAvatar}
            alt={user.displayName}
            sx={{
              width: 56,
              height: 56,
              border: "2px solid #2D2D2D",
              backgroundColor: "#2D2D2D",
            }}
          />
          <Link
            to={`/images-by-author/${user._id}`}
            style={{ textDecoration: "none", color: "#B0B0B0" }}
          >
            {user.displayName}
          </Link>
          {currentUser && currentUser.role === "admin" && (
            <IconButton
              sx={{
                backgroundColor: "#2D2D2D",
                color: "#B0B0B0",
                "&:hover": {
                  backgroundColor: "#ff000a",
                  color: "#FFF",
                },
              }}
              onClick={handleDelete}
              disabled={loading}
            >
              <Delete />
            </IconButton>
          )}
        </CardContent>
      </Card>

      <ModalWindow
        open={openModal}
        onClose={handleCloseModal}
        image={image}
        loading={loading}
      />
    </>
  );
};

export default OneImage;
