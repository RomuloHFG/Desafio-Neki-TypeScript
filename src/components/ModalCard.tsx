import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: '0px 10px 18px rgba(0, 0, 0, 0.9)',
  p: 4,
};

interface InfoModalProps {
  open: boolean;
  handleClose: () => void;
  title: string;
  subheader: string;
  image: string;
  description: string;
  address: string;
  phone: string;
}

const InfoModal: React.FC<InfoModalProps> = ({
  open,
  handleClose,
  title,
  subheader,
  image,
  description,
  address,
  phone,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box>
          <Typography id="modal-modal-title" variant="h6" component="h2" style={{ fontWeight: 'bold' }}>
            {title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {subheader}
          </Typography>
        </Box>
        <CardMedia
          component="img"
          height="150"
          image={image}
          alt={title}
          style={{ objectFit: 'contain' }}
        />
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <strong>Nível de Atuação:</strong> {description}
        </Typography>
        <Typography sx={{ mt: 2 }}>
          <strong>Endereço:</strong> {address}
        </Typography>
        <Typography sx={{ mt: 2 }}>
          <strong>Telefone:</strong> {phone}
        </Typography>
      </Box>
    </Modal>
  );
};

export default InfoModal;
