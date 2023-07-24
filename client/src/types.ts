

export type IUser = {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  createdAt: string;
  updatedAt: string;
};

export type ITask = {
  id: number;
  title: string;
  description?: string;
  status: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export type IAuthFormValue = {
  email: string;
  firstName?: string;
  lastName?: string;
  password: string;
  confirmPassword?: string;
}

export type ILoginResponse = {
  access_token: string; 
  refresh_token: string;
}