import { TApplicationDispatch, TApplicationThunk, TRootState } from "./types";
import {
    TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook
  } from 'react-redux';

export const useSelector: TypedUseSelectorHook<TRootState> = selectorHook;
export const useDispatch = () => dispatchHook<TApplicationDispatch | TApplicationThunk>();