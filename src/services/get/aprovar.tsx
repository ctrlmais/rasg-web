import { supabase } from 'services/supabase';

export async function getBarbeirosApproved(confirm: boolean) {
  const { data, error, status } = await supabase.rpc('busca_filtrada_usuarios', {
    p_id: '',
    p_name: '',
    p_ocupacao: 'barbeiro',
    p_fullname: '',
    p_email: '',
    p_picture: '',
    p_avatar_url: '',
    p_page: 0,
    p_limit: 10,
    p_orderby: 'name',
    p_ascordsc: 'asc',
    p_admin_confirmed: confirm,
  });

  return { data, error, status };
}
