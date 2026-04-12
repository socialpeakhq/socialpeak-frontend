export interface User {
  full_name: string;
  email: string;
  phone_number: string;
  id: number;
  has_connected_workspace: boolean;
  workspace_id: number;
  createdAt: string;
}

export type RegisterUser = {
  full_name: string;
  email: string;
  phone_number: string;
  password: string;
};
