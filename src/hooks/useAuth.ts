import {useAppSelector} from "../store/hooks";

export const useAuth = (): boolean => {
  return useAppSelector((state) => {
    return state.user.isAuth
  });
}
