import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from 'contexts/Auth';
import { ThemeProvider } from 'contexts/Theme';
import { ToastProvider } from 'contexts/Toast';

import { MainRoutes } from './routes';

import 'react-day-picker/lib/style.css';
import 'styles/global.scss';

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <ThemeProvider>
            <MainRoutes />
          </ThemeProvider>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
