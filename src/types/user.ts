export interface UserType {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface UserProfileResponse {
  user: UserType;
}

export interface UserResponse {
  data: UserType[];
}
export interface UserMutationResponse {
  message: string;
  data: UserType[];
}
export interface SingleUserResponse {
  message?: string;
  data: UserType;
}
