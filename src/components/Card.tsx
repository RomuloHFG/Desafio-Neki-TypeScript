import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red, blue, pink } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import InfoModal from './ModalCard';
import EditModal from './EditModal';
import ConfirmDeleteDialog from './Delete';
import { getPhoto, deleteProfessional, updateProfessional } from '../services/authService';
import { toast } from 'react-toastify';

interface CardData {
  title: string;
  subheader: string;
  image: string;
  description: string;
  address: string;
  phone: string;
}

interface RecipeReviewCardProps {
  title?: string;
  subheader?: string;
  image?: string;
  avatarColor?: 'blue' | 'pink' | 'red';
  description?: string;
  address?: string;
  phone?: string;
  id: number;
}

const ExpandMore = styled((props: { expand: boolean; onClick: React.MouseEventHandler<HTMLButtonElement>; children: React.ReactNode }) => {
  const { expand, children, ...other } = props;
  return <IconButton {...other}>{children}</IconButton>;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard({
  title = 'Default Title',
  subheader = 'Default Subheader',
  image = '/static/images/cards/paella.jpg',
  avatarColor = 'blue',
  description = 'Default Description',
  address = 'Default Address',
  phone = 'Number of phone',
  id = 0,
}: RecipeReviewCardProps) {
  const [expanded, setExpanded] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = React.useState(false);
  const [cardData] = React.useState<CardData>({
    title,
    subheader,
    image,
    description,
    address,
    phone,
  });

  const [photoUrl, setPhotoUrl] = React.useState<string | null>(null);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleEditModalOpen = () => {
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  const handleConfirmDeleteOpen = () => {
    setConfirmDeleteOpen(true);
  };

  const handleConfirmDeleteClose = () => {
    setConfirmDeleteOpen(false);
  };

  const getAvatarColor = () => {
    if (avatarColor === 'blue') {
      return blue[500];
    } else if (avatarColor === 'pink') {
      return pink[500];
    } else {
      return red[500];
    }
  };

  const handleEdit = () => {
    handleMenuClose();
    handleEditModalOpen();
  };

  const handleDelete = () => {
    handleMenuClose();
    handleConfirmDeleteOpen();
  };

  const handleSave = async (updatedData: CardData) => {
    try {
      const response = await updateProfessional(id, updatedData);
      if (response.status === 200) {
        window.location.reload();
        toast.success("Informações atualizadas com sucesso!");
      } else {
        toast.error("Falha ao atualizar as informações");
      }
    } catch (error) {
      console.error('Failed to update professional:', error);
      toast.error("Falha ao atualizar as informações");
    }
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await deleteProfessional(id);
      if (response.status === 204) {
        toast.success("Profissional deletado com sucesso!");
        window.location.reload();
      } else {
        toast.error("Falha ao deletar o profissional");
      }
    } catch (error) {
      console.error('Failed to delete professional:', error);
      toast.error("Falha ao deletar o profissional");
    }
    handleConfirmDeleteClose();
  };

  React.useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const photoData = await getPhoto(id);
        if (photoData) {
          setPhotoUrl(`data:image/jpeg;base64,${photoData}`);
        }
      } catch (error) {
        console.error('Failed to load photo:', error);
        toast.error(`Falha ao carregar a Imagem de ${cardData.title}`);
      }
    };

    fetchPhoto();
  }, [id]);

  return (
    <>
      <Card
        style={{
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.8)',
          maxWidth: '300px',
          width: "18.75rem",
        }}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: getAvatarColor() }} aria-label="recipe">
              {cardData.title ? cardData.title.charAt(0) : 'R'}
            </Avatar>
          }
          action={
            <>
              <IconButton aria-label="settings" onClick={handleMenuClick}>
                <MoreVertIcon />
              </IconButton>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={handleEdit}>Editar</MenuItem>
                <MenuItem onClick={handleDelete}>Deletar</MenuItem>
              </Menu>
            </>
          }
          title={cardData.title}
          subheader={cardData.subheader}
          style={{ background: '#319fc9' }}
        />

        <CardMedia
          component="img"
          height="200"
          image={photoUrl || image}
          alt="Professional Photo"
          style={{ objectFit: "contain", paddingTop:"5px"}}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            <strong>Nível de Atuação:</strong> {cardData.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Endereço:</strong> {cardData.address}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Telefone:</strong> {cardData.phone}
          </Typography>
        </CardContent>
        <CardActions disableSpacing style={{ background: '#9bd8ef' }}>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
            <AddCircleOutlineIcon onClick={handleModalOpen} />
          </ExpandMore>
        </CardActions>
      </Card>

      <InfoModal
        open={modalOpen}
        handleClose={handleModalClose}
        title={cardData.title}
        subheader={cardData.subheader}
        image={photoUrl}
        description={cardData.description}
        address={cardData.address}
        phone={cardData.phone}
      />
      <EditModal
        open={editModalOpen}
        handleClose={handleEditModalClose}
        cardData={cardData}
        handleSave={handleSave}
      />
      <ConfirmDeleteDialog
        open={confirmDeleteOpen}
        handleClose={handleConfirmDeleteClose}
        handleConfirm={handleConfirmDelete}
      />
    </>
  );
}
