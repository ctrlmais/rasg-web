import { supabase } from 'services/supabase';

export async function confirmUser(adminId: string, barbeiroId: string, confirm: boolean) {
  const { error, status } = await supabase.rpc('admin_confirm_user', {
    p_admin_id: adminId,
    p_user_id: barbeiroId,
    p_condition: confirm,
  });

  return { error, status };
}
