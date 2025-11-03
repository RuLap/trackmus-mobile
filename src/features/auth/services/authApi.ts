import { camelToSnake, snakeToCamel } from "@/src/uitls/caseConverter";
import { AuthResponse, ConfirmEmailRequest, ConfirmEmailResponse, EmailConfrmedResponse, GoogleAuthRequest, GoogleAuthURLResponse, LoginRequest, RefreshTokenRequest, RegisterRequest, SendConfirmationEmailRequest, SendConfirmationEmailResponse } from "../types/auth";
import { api } from "@/src/lib/api";

export const authApi = {
  login: async (body: LoginRequest) => {
    const response = await api.post('/auth/login', camelToSnake(body));
    return snakeToCamel(response) as AuthResponse;
  },
  
  register: async (body: RegisterRequest) => {
    const response = await api.post('/auth/register', camelToSnake(body));
    return snakeToCamel(response) as AuthResponse;
  },
  
  google: async (body: GoogleAuthRequest) => {
    const response = await api.post('/auth/google', camelToSnake(body));
    return snakeToCamel(response) as AuthResponse;
  },
  
  googleUrl: async () => {
    const response = await api.get('/auth/google/url');
    return snakeToCamel(response) as GoogleAuthURLResponse;
  },
  
  refresh: async (body: RefreshTokenRequest) => {
    const response = await api.post('/auth/refresh', camelToSnake(body));
    return snakeToCamel(response) as AuthResponse;
  },
  
  sendConfirmation: async (body: SendConfirmationEmailRequest, accessToken?: string) => {
    const headers = { Authorization: `Bearer ${accessToken}` };
    const response = await api.post('/auth/email/send-confirmation', camelToSnake(body), { headers });
    return snakeToCamel(response) as SendConfirmationEmailResponse;
  },
  
  confirm: async (body: ConfirmEmailRequest, accessToken?: string) => {
    const response = await api.post('/auth/email/confirm', camelToSnake(body));
    return snakeToCamel(response) as ConfirmEmailResponse;
  },

  confirmed: async (accessToken?: string) => {
    const headers = { Authorization: `Bearer ${accessToken}` };
    const response = await api.get('/auth/email/confirmed',{ headers });
    return snakeToCamel(response) as EmailConfrmedResponse;
  }
}