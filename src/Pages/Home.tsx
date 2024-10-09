import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Layout, theme } from 'antd';
import Footer from '../components/Footer';
import ResponsiveGrid from '../components/Grid';
import icon2 from '../assets/img/icons/icon2.gif';
import logoff from '../assets/img/icons/logoff.png';
import { toast } from 'react-toastify';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const { Header, Content } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();

  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    toast.info('Usuário deslogado');
    navigate('/login');
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <Layout style={{ minHeight: '100vh', background: darkMode ? '#1c1c1c' : '#fff' }}>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: darkMode ? '#333' : 'linear-gradient(to right, #319fc9, #9bd8ef)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '16px' }}>
            <img src={icon2} alt="Icon" style={{ height: '45px' }} />
            <h2 style={{ color: darkMode ? 'white' : 'black' }}>SaúdeDigital</h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', paddingRight: '16px' }}>
            <Button 
              onClick={toggleDarkMode} 
              style={{ 
                backgroundColor: "transparent", 
                border: "none", 
                height: '40px', 
                width: '40px', 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: '10px', 
              }}
            >
              <SettingsBrightnessIcon style={{ height: '24px', width: '24px' }} />
            </Button>
            <Button
              type="text"
              onClick={handleLogout}
              style={{ 
                backgroundColor: "transparent", 
                border: "none", 
                height: '40px', 
                width: '40px', 
              }}
            >
              <ExitToAppIcon/>
            </Button>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            borderRadius: borderRadiusLG,
            background: darkMode ? '#1c1c1c' : '#fff',
            color: darkMode ? 'white' : 'black',
          }}
        >
          <div style={{ textAlign: "center", fontSize: "30px", padding: 10 }}>
            <p>
              Bem-vindo ao <strong style={{ color: "#319fc9" }}>SaúdeDigital</strong>,
              onde <strong style={{ color: "#319fc9" }}>tecnologia</strong> e <strong style={{ color: "#319fc9" }}>saúde </strong>
              se unem para cuidar do seu <strong style={{ color: "#319fc9" }}>bem-estar</strong> com <strong style={{ color: "#319fc9" }}>
              inovação</strong> e <strong style={{ color: "#319fc9" }}>praticidade</strong>.
            </p>
            <p>Explore nossa rede de <strong style={{ color: "#319fc9" }}>especialistas</strong>!</p>
          </div>
          <ResponsiveGrid />
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
};

export default App;
