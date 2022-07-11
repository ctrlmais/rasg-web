import { supabase } from 'services/supabase';

export async function deletePicture(idPhoto: string) {
  const { data, error } = await supabase
    .from('tb_profile_photo')
    .delete()
    .match({ id: idPhoto });

  return { data, error };
}
