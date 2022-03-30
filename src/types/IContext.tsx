/* eslint-disable no-unused-vars */

export interface AppMetadata {
  provider: string;
  providers: string[];
}

export interface UserMetadata {
  id: string;
  avatar_url: string;
  email: string;
  email_verified: boolean;
  full_name: string;
  iss: string;
  name: string;
  nome: string;
  picture: string;
  provider_id: string;
  ocupacao: string;
  sub: string;
}

export interface IdentityData {
  sub: string;
  avatar_url: string;
  email: string;
  email_verified?: boolean;
  full_name: string;
  iss: string;
  name: string;
  picture: string;
  provider_id: string;
}

export interface Identity {
  id: string;
  user_id: string;
  identity_data: IdentityData;
  provider: string;
  last_sign_in_at: Date;
  created_at: Date;
  updated_at: Date;
}

export interface User {
  id: string;
  aud: string;
  role: string;
  email: string;
  email_confirmed_at: Date;
  phone: string;
  confirmation_sent_at: Date;
  confirmed_at: Date;
  last_sign_in_at: string;
  app_metadata: AppMetadata;
  user_metadata: UserMetadata;
  identities: Identity[];
  created_at: Date;
  updated_at: Date;
}

export interface UserAuth {
  access_token: string;
  token_interface: string;
  expires_in: number;
  refresh_token: string;
  user: User;
}

export interface AuthContextProps {
  signed: boolean;
  user: User | null;
  setUser: (user: any) => void;
  handleLogout: () => void;
  handleLoginGoogle: () => void;
  formikLogin: any;
  ocupacao: string;
  setOcupacao: (ocupacao: string) => void;
  loading: boolean;
}
