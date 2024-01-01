import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './Router.tsx';
import './index.css';
import '@mantine/core/styles.css';
import { MantineProvider, createTheme } from '@mantine/core';
import { Toaster } from 'sonner';
import { Provider } from 'react-redux';
import { store } from './store/index.ts';

const theme = createTheme({
  fontFamily: 'Monserat, sans-serif',
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <MantineProvider theme={theme}>
        <Toaster richColors position="top-center" />
        <Router />
      </MantineProvider>
    </Provider>
  </React.StrictMode>
);
