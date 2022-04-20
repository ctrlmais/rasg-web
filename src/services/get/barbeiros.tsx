import { supabase } from 'services/supabase';

export async function getBarbeiros() {
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
    p_admin_confirmed: true,
  });

  return { data, error, status };
}

export async function getBarbeiro(id: string, confirmation: boolean = false) {
  const { data, error, status } = await supabase.rpc('busca_filtrada_usuarios', {
    p_id: id,
    p_name: '',
    p_ocupacao: '',
    p_fullname: '',
    p_email: '',
    p_picture: '',
    p_avatar_url: '',
    p_page: 0,
    p_limit: 10,
    p_orderby: 'name',
    p_ascordsc: 'asc',
    p_admin_confirmed: confirmation,
  });

  return { data, error, status };
}
