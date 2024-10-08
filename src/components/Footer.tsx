import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn, GitHub } from '@mui/icons-material';
import icon2 from '../assets/img/icons/icon2.gif';

const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        background: 'linear-gradient(to right, #319fc9, #9bd8ef)',
        borderTop: '1px solid #e7e7e7',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box
          component="img"
          src={icon2}
          alt="Logo"
          sx={{ width: 40, height: 40, marginRight: '10px' }}
        />
        <Typography variant="h6" color="white" fontFamily="-moz-initial">
          SaúdeDigital
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: '15px' }}>
        <Link href="#" color="textSecondary" variant="body2" style={{ textDecoration: "none", fontSize: "15px" }}>
          Política de privacidade
        </Link>
      </Box>

      <Box sx={{ display: 'flex', gap: '30px' }}>
        <Link href="https://github.com/Romulo-HFG" color="inherit">
          <GitHub />
        </Link>
        <Link href="https://www.linkedin.com/in/r%C3%B4mulo-henrique-ferreira-gon%C3%A7alves-255b31298/" color="inherit">
          <LinkedIn />
        </Link>
        <Link href="#" color="inherit">
          <Facebook />
        </Link>
        <Link href="#" color="inherit">
          <Twitter />
        </Link>
        <Link href="#" color="inherit">
          <Instagram />
        </Link>
      </Box>

      <Typography variant="body2" color="textSecondary" sx={{ marginLeft: '20px' }}>
        © 2024 SaúdeDigital. Todos os direitos reservados.
      </Typography>
    </Box>
  );
};

export default Footer;
