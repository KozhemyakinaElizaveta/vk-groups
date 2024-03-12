import {
    OPEN_MODAL,
    CLOSE_MODAL,
    TActions,
    GROUP,
    NO_GROUP,
} from "./actions";

type TInitialState = {
    openModal: boolean;
    group: any;
}

export const InitialState: TInitialState = {
    openModal: false,
    group: null,
};

export const modalReducer = (state = InitialState, action: TActions | undefined): TInitialState => {
    switch (action?.type) {
        case GROUP: {
            return {
            ...state,
            group: action.group,
            };
        }
        case NO_GROUP: {
            return {
            ...state,
            group: null,
            };
        }
        case OPEN_MODAL: {
        return {
            ...state,
            openModal: true
        };
        }
        case CLOSE_MODAL: {
        return {
            ...state,
            openModal: false,
        };
        }
        default: {
        return state;
        }
    }
};