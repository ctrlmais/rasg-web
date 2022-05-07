import { supabase } from 'services/supabase';

export async function getClientesApproved(confirm: boolean, page: number) {
  const { data, error, status } = await supabase.rpc('busca_filtrada_usuarios', {
    p_id: '',
    p_name: '',
    p_ocupacao: 'cliente',
    p_fullname: '',
    p_email: '',
    p_picture: '',
    p_avatar_url: '',
    p_page: page,
    p_limit: 5,
    p_orderby: 'name',
    p_ascordsc: 'asc',
    p_admin_confirmed: confirm,
  });

  return { data, error, status };
}
