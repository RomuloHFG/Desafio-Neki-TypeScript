import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import cardiologistaImg from '../assets/img/cardiologista.jpg';
import dentistaImg from '../assets/img/dentista.jpg';
import plasticaImg from '../assets/img/plástica.jpg';
import radiologistaImg from '../assets/img/radiologista.png';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

interface Image {
  imgPath: string;
  label?: string;
}

const images: Image[] = [
  { imgPath: cardiologistaImg },
  { imgPath: dentistaImg },
  { imgPath: plasticaImg },
  { imgPath: radiologistaImg },
];

function SwipeableTextMobileStepper() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = images.length;

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '98%',
        margin: '0 auto',
        border: '1px solid grey',
        borderRadius: '5px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.8)',
      }}
    >
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        sx={{
          width: '100%',
        }}
      >
        {images.map((step, index) => (
          <div key={index}>
            <Box
              component="img"
              sx={{
                height: 400,
                display: 'block',
                maxWidth: '100%',
                width: '100%',
                objectFit: 'cover',
                visibility: Math.abs(activeStep - index) <= 2 ? 'visible' : 'hidden',
              }}
              src={step.imgPath}
              alt={`Step ${index}`}
            />
          </div>
        ))}
      </AutoPlaySwipeableViews>
    </Box>
  );
}

export default SwipeableTextMobileStepper;
