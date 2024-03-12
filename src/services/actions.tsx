export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";
export const GROUP = "GROUP";
export const NO_GROUP = "NO_GROUP";

export interface IOpen {
    readonly type: typeof OPEN_MODAL;
}

export interface IClose {
    readonly type: typeof CLOSE_MODAL;
}

export interface ICurrentGroup {
    readonly type: typeof GROUP;
    readonly group: any;
}

export interface INoGroup {
    readonly type: typeof NO_GROUP;
}

export type TActions =
    | ICurrentGroup
    | INoGroup
    | IClose
    | IOpen;

export function selectGroup(select_group: any): ICurrentGroup {
    return {
        type: GROUP,
        group: select_group,
    };
}