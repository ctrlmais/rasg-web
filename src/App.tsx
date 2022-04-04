import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from 'contexts/Auth';
import { ThemeProvider } from 'contexts/Theme';
import { ToastProvider } from 'contexts/Toast';
import { UserProvider } from 'contexts/User';

import { MainRoutes } from './routes';

import 'react-day-picker/dist/style.css';
import 'styles/global.scss';

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <ToastProvider>
            <ThemeProvider>
              <MainRoutes />
            </ThemeProvider>
          </ToastProvider>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
