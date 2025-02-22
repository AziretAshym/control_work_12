import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { RootState } from "../../../app/store.ts";
import { deleteImage, fetchImagesByAuthor } from "../imagesThunks.ts";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import { Image } from "../../../types";
import { Delete } from "@mui/icons-material";
import { apiUrl } from "../../../globalConstants.ts";
import ModalWindow from "../components/ModalWindow.tsx";

const ImagesByUser: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const dispatch = useAppDispatch();
  const { images, loading } = useSelector((state: RootState) => state.images);
  const user = useAppSelector((state) => state.users.user);

  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

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

  const handleOpenModal = (image: Image) => {
    setSelectedImage(image);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedImage(null);
  };

  return (
    <>
      <Typography variant="h4">
        Paintings by the <strong>{images[0]?.user.displayName}</strong>
      </Typography>
      <Box sx={{ padding: "20px" }}>
        {loading ? (
          <CircularProgress sx={{ display: "block", margin: "auto" }} />
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
              const cardImage = image.image ? `${apiUrl}/${image.image}` : "";
              const authorAvatar = image.user.avatar
                ? `${apiUrl}/${image.user.avatar}`
                : "";

              return (
                <Grid key={image._id}>
                  <Card
                    sx={{
                      width: 350,
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: "16px",
                      backgroundColor: "#1E1E1E",
                      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
                    }}
                    onClick={() => handleOpenModal(image)}
                  >
                    <CardMedia
                      component="img"
                      image={cardImage}
                      title={image.title}
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
                          {image.title}
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
                        alt={image.user.displayName}
                        sx={{
                          width: 56,
                          height: 56,
                          border: "2px solid #2D2D2D",
                          backgroundColor: "#2D2D2D",
                        }}
                      />
                      <Link
                        to={`/images-by-author/${image.user._id}`}
                        style={{ textDecoration: "none", color: "#B0B0B0" }}
                      >
                        {image.user.displayName}
                      </Link>
                      {user &&
                        (user._id === image.user._id ||
                          user.role === "admin") && (
                          <IconButton
                            sx={{
                              backgroundColor: "#2D2D2D",
                              color: "#B0B0B0",
                              "&:hover": {
                                backgroundColor: "#ff000a",
                                color: "#FFF",
                              },
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

      <ModalWindow
        open={openModal}
        onClose={handleCloseModal}
        image={selectedImage}
        loading={loading}
      />
    </>
  );
};

export default ImagesByUser;
