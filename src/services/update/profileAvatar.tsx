import { supabase } from 'services/supabase';

export async function updateProfilePhoto(id: string, avatar: string) {
  const { error } = await supabase.rpc('upsert_profile_photo', {
    p_user_id: id,
    p_src: avatar === '' ? undefined : avatar,
  });

  return { error };
}
