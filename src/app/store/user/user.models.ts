export interface User {
    id: string;
    email: string;
}
  
export interface UserState {
    user: User | null;
    status: 'idle' | 'loading' | 'success' | 'error';
    error: string | null;
}
