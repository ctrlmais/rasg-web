import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Swal from 'sweetalert2';

import { AuthProvider } from 'contexts/Auth';
import { ThemeProvider } from 'contexts/Theme';
import { ToastProvider } from 'contexts/Toast';
import { UserProvider } from 'contexts/User';

import { useServiceWorker } from 'hooks/useServiceWorker';

import { MainRoutes } from './routes';

import 'react-day-picker/dist/style.css';
import 'styles/global.scss';

export function App() {
  const { waitingWorker, showReload, reloadPage } = useServiceWorker();

  useEffect(() => {
    if (showReload && waitingWorker) {
      Swal.fire({
        title: 'Atualização disponível',
        text: 'Atualize a página para ver as novas atualizações',
        icon: 'info',
        confirmButtonColor: '#ff9000',
        background: '#312e38',
        color: '#f4ede8',
        confirmButtonText: 'Atualizar',
      }).then((result) => {
        if (result.isConfirmed) {
          reloadPage();
        }
      });
    }
  }, [showReload, waitingWorker, reloadPage]);
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <UserProvider>
            <ThemeProvider>
              <MainRoutes />
            </ThemeProvider>
          </UserProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}
