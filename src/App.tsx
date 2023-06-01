import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import Home from './pages/Home';
import Graffitis from './pages/Graffitis';
import Portraits from './pages/Portraits';
import Landscapes from './pages/Landscapes';
import Youth from './pages/Youth';
import { theme } from './styles/Theme';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/graffitis" element={<Graffitis />} />
          <Route path="/portraits" element={<Portraits />} />
          <Route path="/paysages" element={<Landscapes />} />
          <Route path="/jeunesse" element={<Youth />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
