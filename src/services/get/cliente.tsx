import { supabase } from 'services/supabase';

export async function getCliente(id: string) {
  const { data, error, status } = await supabase.rpc('busca_filtrada_usuarios', {
    p_id: id,
    p_name: '',
    p_ocupacao: 'cliente',
    p_fullname: '',
    p_email: '',
    p_picture: '',
    p_avatar_url: '',
    p_page: 0,
    p_limit: 10,
    p_orderby: 'name',
    p_ascordsc: 'asc',
  });

  return { data, error, status };
}
