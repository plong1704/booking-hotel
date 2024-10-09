import { OAuthProvider } from "../enum"

export interface SignUpRequest {
  username: string,
  password: string,
  fullName: string,
  phone: string
}
export interface SignInRequest {
  username: string,
  password: string,
}
export interface ForgetPasswordRequest {
  username: string,
  newPassword: string,
}

export interface SocialUserRequest {
  email: string,
  firstName?: string,
  lastName?: string,
  name: string,
  photoUrl: string,
  provider: OAuthProvider,
  id: string
}
