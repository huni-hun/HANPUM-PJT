export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Token {
  accessToken: string;
  refreshToken: string;
}
