export { initialState as initialStateUser} from "./model/reducers/UserSlice";
export { userService } from "./api/UserService";
export {type IUser} from './model/types'
export {default as UserReducer} from './model/reducers/UserSlice'
export {useUserAcions} from './lib/hooks/useUserAcions'