import { useAuth } from './useAuth';

export function usePerfil() {
  const { user } = useAuth();

  function isBarbeiro() {
    if (user) {
      if (user.tipoUsuario?.authority === 'GERENCIADOR') {
        return true;
      }
    }

    return false;
  }

  function isCliente() {
    if (user) {
      if (
        user.tipoUsuario?.authority === 'CLIENTE' ||
        user.tipoUsuario?.authority === 'ADMINISTRADOR'
      ) {
        return true;
      }
    }

    return false;
  }

  function isAdmin() {
    if (user) {
      if (user.tipoUsuario?.authority === 'ADMINISTRADOR') {
        return true;
      }
    }

    return false;
  }

  return {
    isBarbeiro: isBarbeiro(),
    isCliente: isCliente(),
    isAdmin: isAdmin(),
  };
}
