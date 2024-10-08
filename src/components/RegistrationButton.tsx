import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Select, MenuItem, InputLabel } from '@mui/material';
import { getLevelsofexpertise, getSpecialties } from '../services/authService';

// Definindo a interface para as props do componente
interface CadastroButtonProps {
  onSave: (data: {
    name: string;
    image: File | null;
    area: string;
    level: string;
    address: string;
    phone: string;
  }) => void;
}

const CadastroButton: React.FC<CadastroButtonProps> = ({ onSave }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const [area, setArea] = useState<string>('');
  const [level, setLevel] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  const [levelsofexpertise, setLevelsofexpertise] = useState<{ id: string; name: string }[]>([]);
  const [specialties, setSpecialties] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [specialtiesData, levelsData] = await Promise.all([
          getSpecialties(),
          getLevelsofexpertise(),
        ]);
        setSpecialties(specialtiesData);
        setLevelsofexpertise(levelsData);
      } catch (error) {
        console.error('Erro ao obter dados:', error);
      }
    };

    fetchData();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setImage(null);
    setArea('');
    setLevel('');
    setAddress('');
    setPhone('');
  };

  const handleSave = () => {
    const cardData = {
      name,
      image,
      area,
      level,
      address,
      phone,
    };
    onSave(cardData);
    handleClose();
  };

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        style={{
          background: "#9bd8ef",
          borderWidth: "1px",
          borderColor: "white",
          borderRadius: "5px",
          margin: '5px',
          color: "#009",
          boxShadow: '0px 4px 8px rgba(9, 9, 9, 0.4)',
          height: "100%",
          fontWeight: "bold"
        }}
      >
        Cadastrar
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{ background: 'linear-gradient(to right, #319fc9, #9bd8ef,#319fc9)', fontWeight: "bold" }}>
          Cadastrar
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nome"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            style={{ borderRadius: '5px', marginTop: '10px' }}
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
          />
          <InputLabel id="select-area-label" style={{ marginTop: '20px' }}>Área de Atuação</InputLabel>
          <Select
            labelId="select-area-label"
            id="select-area"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            fullWidth
          >
            {specialties.map((specialty) => (
              <MenuItem key={specialty.id} value={specialty.id}>{specialty.name}</MenuItem>
            ))}
          </Select>
          <InputLabel id="select-level-label" style={{ marginTop: '20px' }}>Nível de Atuação</InputLabel>
          <Select
            labelId="select-level-label"
            id="select-level"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            fullWidth
          >
            {levelsofexpertise.map((expertise) => (
              <MenuItem key={expertise.id} value={expertise.id}>{expertise.name}</MenuItem>
            ))}
          </Select>
          <TextField
            margin="dense"
            label="Endereço do Local de Trabalho"
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Telefone"
            fullWidth
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </DialogContent>
        <DialogActions style={{ background: 'linear-gradient(to right, #319fc9, #9bd8ef,#319fc9)' }}>
          <Button onClick={handleClose} style={{ color: "black", fontWeight: "bold" }}>Cancelar</Button>
          <Button onClick={handleSave} style={{ color: "black", fontWeight: "bold" }}>Salvar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CadastroButton;
