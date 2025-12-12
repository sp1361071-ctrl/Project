export enum AuthMode {
  LOGIN = 'LOGIN',
  SIGNUP = 'SIGNUP'
}

export interface User {
  email: string;
  name?: string;
}

export interface PasswordSuggestionResponse {
  suggestion: string;
  strength: 'weak' | 'medium' | 'strong';
  reasoning: string;
}