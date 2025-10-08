import React from 'react';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Router from './Components/Router';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Navbar />

          {/* Add margin/padding top to avoid overlap */}
          <main className="flex-grow mt-16">
            <Router />
          </main>

          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
