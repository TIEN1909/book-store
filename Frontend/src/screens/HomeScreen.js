import React, { useState } from 'react';
import Header from './../components/Header';
import ShopSection from './../components/homeComponents/ShopSection';
import CalltoActionSection from './../components/homeComponents/CalltoActionSection';
import Footer from './../components/Footer';
import ScrollToTop from 'react-scroll-to-top';
import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import { SearchProvider } from '../components/homeComponents/SearchContext';
// import ReactSwitcher from 'react-switch';

const HomeScreen = () => {
  window.scrollTo(0, 0);
  const context = useContext(ThemeContext);
  return (
    <div id={context.theme}>
      <SearchProvider>
        <Header type="searchs" />
        <ShopSection />
        <CalltoActionSection />
        <ScrollToTop smooth color="blue" />
        <Footer />
      </SearchProvider>
    </div>
  );
};

export default HomeScreen;
