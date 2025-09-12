export interface User_Type {
    id: string;
    username: string;
    email: string;
    role: 'user' | 'admin';
}