import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import CustomCursor from './components/CustomCursor';
import ParticleBackground from './components/ParticleBackground';
import WelcomeScreen from './components/WelcomeScreen';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

function App() {
  return (
    <ThemeProvider>
      <WelcomeScreen />
      <CustomCursor />
      <ParticleBackground />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
