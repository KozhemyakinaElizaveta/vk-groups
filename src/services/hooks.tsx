import {
    useDispatch as dispatchHook,
    useSelector as selectorHook, TypedUseSelectorHook
} from 'react-redux';
import type { RootState, AppDispatch, AppThunkDispatch } from '../services/store';


export const useAppDispatch = () => dispatchHook<AppDispatch & AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = selectorHook