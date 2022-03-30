import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from 'contexts/Auth';
import { BarbeiroProvider } from 'contexts/Barbeiro';
import { ThemeProvider } from 'contexts/Theme';
import { ToastProvider } from 'contexts/Toast';

import { MainRoutes } from './routes';

import 'react-day-picker/lib/style.css';
import 'styles/global.scss';

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <BarbeiroProvider>
          <ToastProvider>
            <ThemeProvider>
              <MainRoutes />
            </ThemeProvider>
          </ToastProvider>
        </BarbeiroProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
