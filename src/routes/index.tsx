import { useAuth } from 'hooks/useAuth';

import { PrivateRoutes } from './PrivateRoutes';
import { PublicRoutes } from './PublicRoutes';
export function MainRoutes() {
  const { signed } = useAuth();

  return signed ? <PrivateRoutes /> : <PublicRoutes />;
}
