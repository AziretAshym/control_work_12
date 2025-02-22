import React from 'react';
import { Image } from '../../../types';
import { Modal, Box, IconButton, CircularProgress, CardMedia } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { apiUrl } from '../../../globalConstants';

interface Props {
  open: boolean;
  onClose: () => void;
  image: Image | null;
  loading: boolean;
}

const ModalWindow: React.FC<Props> = ({ open, onClose, image, loading }) => {
  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Box sx={{ position: 'relative', outline: 'none' }}>
          <IconButton
            sx={{
              position: 'absolute',
              top: 10,
              right: 10,
              color: '#fff',
              zIndex: 1
            }}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
          {loading ? (
            <CircularProgress />
          ) : (
            <CardMedia
              component="img"
              image={image ? `${apiUrl}/${image.image}` : ''}
              alt={image?.title}
              sx={{ maxHeight: '600px', maxWidth: '950px', borderRadius: 4 }}
            />
          )}
        </Box>
      </Modal>
    </>
  );
};

export default ModalWindow;