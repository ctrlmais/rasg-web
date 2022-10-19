import { createContext, useContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import { ToastContextProps } from 'types/ContextProps';

const ToastContext = createContext<ToastContextProps>({} as ToastContextProps);

export const ToastProvider = ({ children }: any) => (
  <ToastContext.Provider value={{ toast }}>
    {children}
    <div className="toast-wrapper">
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  </ToastContext.Provider>
);

export function useToast() {
  const context = useContext(ToastContext);

  return context;
}
