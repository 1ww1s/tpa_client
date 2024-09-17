
export interface UserState{
    user: IUser;
    isLoading: boolean;
    error: string;
} 
 
export interface IUser {
    email: string;
    isAuth: boolean;
    roles: string[];
}