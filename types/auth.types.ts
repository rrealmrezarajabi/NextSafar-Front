export type Role = "user" | "owner";

export interface Account {
  id: number;
  first_name: string;
  last_name: string;
  role: Role;
}

export interface UserProfile extends Account {
  phone: string;
  email: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;
  account: Account;
}

export interface RegisterUserResponse {
  refresh: string;
  access: string;
  user: UserProfile;
}

export interface RegisterOwnerResponse {
  refresh: string;
  access: string;
  owner: UserProfile;
}

export interface RefreshTokenResponse {
  access: string;
}
