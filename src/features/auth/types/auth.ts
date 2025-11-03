export interface AuthResponse {
  accessToken: string;
	refreshToken: string;
	expiresIn: number;
	userId: string;
	email: string;
}

export interface GoogleUserInfo {
  id: string;
	email: string;
	verifiedEmail: boolean;
	name: string;
	givenName: string;
	familyName: string;
	picture: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface GoogleAuthRequest {
  code: string;
  state: string;
}

export interface GoogleAuthURLResponse {
  url: string;
  state: string;
}

export interface SendConfirmationEmailRequest {
  email: string;
}

export interface ConfirmEmailRequest {
  token: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface SendConfirmationEmailResponse {
  success: boolean;
  message: string;
}

export interface ConfirmEmailResponse {
  success: boolean;
  message: string;
}

export interface EmailConfrmedResponse {
  confirmed: boolean;
}