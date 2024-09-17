
export interface LoadingActionState{
    loadingAction: ILoadingAction;
    isLoading: boolean;
    error: string;
} 
 
export interface ILoadingAction {
    value: boolean;
}