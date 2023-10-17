import "bulma/css/bulma.css";

import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer'
import Main from './components/Main';

export default async function Page() {
  const style = {
    width: "100%",
    minHeight: "100vh"
  };

  return (
    <div style={style}>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
