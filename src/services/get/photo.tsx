import { supabase } from '../supabase';

export async function getPhoto(id: string) {
  const { data, error, status } = await supabase.rpc('busca_filtrada_fotos_usuario', {
    p_user_id: id,
    p_page: 0,
    p_limit: 10,
    p_orderby: 'created_at',
    p_ascordsc: 'asc',
  });

  return { data, error, status };
}
