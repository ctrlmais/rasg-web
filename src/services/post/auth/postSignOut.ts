import Cookies from 'js-cookie';

export async function postSignOutAWS() {
  localStorage.removeItem('@barber:token');
  localStorage.removeItem('@barber:user');
  localStorage.removeItem('@barber:expires');
  localStorage.removeItem('@barber:horarios');

  Cookies.remove('barbeiro_modal');
}
