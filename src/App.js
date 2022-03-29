import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import { store, persistor } from './redux/store';
import IndexRouter from './router/IndexRouter';
import { PersistGate } from 'redux-persist/integration/react'

function App() {
  return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <IndexRouter />
        </PersistGate>
      </Provider>
  );
}

export default App;