import React from 'react';
import Routes from './routes';
import { BrowserRouter } from 'react-router-dom';
import StyleGlobal from './styles/global'
const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
      <StyleGlobal />
    </>);
}

export default App;
