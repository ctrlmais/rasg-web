import Cookies from 'js-cookie';

export async function postSignOutAWS() {
  localStorage.removeItem('@rasg:token');
  localStorage.removeItem('@rasg:user');
  localStorage.removeItem('@rasg:expires');
  localStorage.removeItem('@rasg:horarios');
  localStorage.removeItem('@rasg:picture');
  localStorage.removeItem('@rasg:avatar');
  localStorage.removeItem('@rasg:cliente');

  Cookies.remove('barbeiro_modal');
}
