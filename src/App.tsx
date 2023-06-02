import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import Home from './pages/Home';
import Graffitis from './pages/Graffitis';
import PortraitsAndAnimals from './pages/PortraitsAndAnimals';
import LandscapesAndObjects from './pages/LandscapesAndObjects';
import Youth from './pages/Youth';
import { theme } from './styles/Theme';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/graffitis" element={<Graffitis />} />
          <Route path="/paysages-objets" element={<LandscapesAndObjects />} />
          <Route path="/portraits-animaux" element={<PortraitsAndAnimals />} />
          <Route path="/jeunesse" element={<Youth />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
