export function usePerfil() {
  const storagedUser = JSON.parse(localStorage.getItem('@barber:user') || '{}');

  function isBarbeiro() {
    if (storagedUser) {
      if (storagedUser.tipoUsuario?.authority === 'GERENCIADOR') {
        return true;
      }
    }

    return false;
  }

  function isCliente() {
    if (storagedUser) {
      if (
        storagedUser.tipoUsuario?.authority === 'CLIENTE' ||
        storagedUser.tipoUsuario?.authority === 'ADMINISTRADOR'
      ) {
        return true;
      }
    }

    return false;
  }

  function isAdmin() {
    if (storagedUser) {
      if (storagedUser.tipoUsuario?.authority === 'ADMINISTRADOR') {
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
