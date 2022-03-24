import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider } from 'contexts/Theme';
import { ToastProvider } from 'contexts/Toast';

import { MainRoutes } from './routes';

import 'styles/global.scss';

export function App() {
  return (
    <ToastProvider>
      <ThemeProvider>
        <BrowserRouter>
          <MainRoutes />
        </BrowserRouter>
      </ThemeProvider>
    </ToastProvider>
  );
}
