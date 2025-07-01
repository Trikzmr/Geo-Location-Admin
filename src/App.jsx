import React from 'react';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Router from './Components/Router';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Router />
      <Footer />
    </BrowserRouter>
  );
};

export default App;
