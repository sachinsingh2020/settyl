import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ColorModeScript, theme } from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/react';
import store from './redux/store';
import { Provider as ReduxProvider } from 'react-redux';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ReduxProvider store={store}>
    <ChakraProvider>
      <ColorModeScript theme={theme} />
      <App />
    </ChakraProvider>
  </ReduxProvider>
);

