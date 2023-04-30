import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux';
import store from './store';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import 'css/normalize.css'
import 'css/index.css'
import 'css/currency-flags.css'

import { ThemeModeProvider } from './context/ThemeModeProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ThemeModeProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeModeProvider>
);
