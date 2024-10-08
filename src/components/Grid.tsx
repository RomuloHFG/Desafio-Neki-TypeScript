import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import RecipeReviewCard from './Card';
import Carousel from './Carousel';
import CadastroButton from './RegistrationButton';
import SearchBar from './Search';
import { getProfessionals, postPhoto, postProfessionals } from '../services/authService';
import { Grid, Pagination } from '@mui/material'; 

interface Professional {
  id: number;
  name: string;
  specialty: { id: number; name: string };
  levelOfExpertise: { id: number; name: string };
  address: string;
  phone: string;
  photo: string;
}

export default function ResponsiveGrid() {
  const [cards, setCards] = useState<Professional[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); 

  const handleSaveCard = async (data: any) => {
    console.log(data);

    try {
      const requestData = {
        name: data.name,
        specialty: {
          id: data.area,
        },
        levelOfExpertise: {
          id: data.level,
        },
        address: data.address,
        phone: data.phone,
      };

      const response = await postProfessionals(requestData);
      await handleUpload(response.id, data.image);
      window.location.reload();
    } catch (error) {
      console.error('Erro ao salvar profissional:', error);
    }
  };

  const handleUpload = async (professionalId: number, imageFile: File) => {
    const formData = new FormData();
    formData.append('photo', imageFile);

    try {
      const response = await postPhoto(formData, professionalId);
      console.log('Resposta do servidor:', response.data);
    } catch (error) {
      console.error('Erro ao carregar a imagem:', error);
    }
  };

  const filteredCards = cards.filter((card) =>
    card.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // Calcular os índices dos itens exibidos na página atual
  const indexOfLastCard = currentPage * itemsPerPage;
  const indexOfFirstCard = indexOfLastCard - itemsPerPage;
  const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);

  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProfessionals();
        console.log(response);
        setCards(response);
      } catch (error) {
        console.error('Erro ao obter dados:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <Box
        sx={{
          width: '100%',
          margin: '0 auto',
          mb: 2,
        }}
      >
        <Carousel />
      </Box>

      <div style={{
        background: 'linear-gradient(to right, #319fc9, #9bd8ef)',
        height: '15vh',
        width: '98%',
        borderWidth: "1px",
        borderColor: "white",
        borderRadius: "5px",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        textAlign: "center"
      }}>
        <CadastroButton onSave={handleSaveCard} />
        <div><h1>O que você está procurando?</h1></div>
        <SearchBar searchText={searchText} setSearchText={setSearchText} />
      </div>

      <div style={{ paddingTop: 20, color: '#319fc9' }}>
        <h1>↓Profissionais especializados cadastrados↓</h1>
      </div>

      <Grid
        container
        spacing={5}
        sx={{
          maxWidth: '100%',
          margin: '0 auto',
          padding: '0',
          justifyContent: 'center',
        }}
      >
        {currentCards.map((card) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={card.id}
            sx={{ minWidth: '300px' }}
          >
            <RecipeReviewCard
              title={card.name}
              subheader={card.specialty.name}
              image={card.photo}
              description={card.levelOfExpertise.name}
              address={card.address}
              phone={card.phone}
              id={card.id}
            />
          </Grid>
        ))}
      </Grid>

      <Pagination
        count={Math.ceil(filteredCards.length / itemsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        sx={{ margin: '20px 0' }}
        color="primary"
      />
    </Box>
  );
}
