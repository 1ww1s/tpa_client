import { AppDispatch, RootState } from "@/src/app/store/store";
import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";


export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()