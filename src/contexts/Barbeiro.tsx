import { createContext, useContext, useState } from 'react';

import { UserMetadata } from 'types/IContext';

interface IBarbeiroContext {
  barbeiro: UserMetadata | undefined;
  // eslint-disable-next-line no-unused-vars
  setBarbeiro: (barbeiro: UserMetadata) => void;
}

const Barbeiro = createContext({} as IBarbeiroContext);

export function BarbeiroProvider({ children }: any) {
  const [barbeiro, setBarbeiro] = useState<UserMetadata>();

  return (
    <Barbeiro.Provider
      value={{
        barbeiro,
        setBarbeiro,
      }}
    >
      {children}
    </Barbeiro.Provider>
  );
}

export function useBarbeiro() {
  const context = useContext(Barbeiro);
  if (!context) {
    throw new Error('useBarbeiro must be used within a BarbeiroProvider');
  }
  return context;
}
