import { ActionCreator, applyMiddleware, combineReducers, compose } from "redux";
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";
import { TActions } from "./actions";
import { modalReducer } from "./reducers";
import { store } from "..";

export const rootReducer = combineReducers({
    modalReducer,
});

type TAppActions = TActions;

const composeEnhancers = (window as any)['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;
export const enhancer = composeEnhancers(
    applyMiddleware(thunk)
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunkDispatch = ThunkDispatch<RootState, any, TAppActions>;
export type AppThunk<TReturn = void> = ActionCreator<
    ThunkAction<TReturn, RootState, any, TAppActions>
>;

export const getOpenModal = (store: RootState) => store.modalReducer.openModal
export const getFriends = (store: RootState) => store.modalReducer