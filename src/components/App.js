import React from 'react';
import { I18nProvider } from '@lingui/react';

import './App.css';
import { i18n } from '../i18n';

import AppRouter from './AppRouter';

const App = () =>
  <div className="app">
    <I18nProvider i18n={i18n}>
      <AppRouter />
    </I18nProvider>
  </div>

export default App;