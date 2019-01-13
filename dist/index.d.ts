import { IActionCreators, IReducers } from 'redux-hub';
import { ActionTypes } from 'redux-undo';
export interface IUndoActionCreators {
    undo: () => {
        type: ActionTypes.UNDO;
    };
    redo: () => {
        type: ActionTypes.REDO;
    };
    jumpToFuture: (index: number) => {
        type: ActionTypes.JUMP_TO_FUTURE;
        index: number;
    };
    jumpToPast: (index: number) => {
        type: ActionTypes.JUMP_TO_PAST;
        index: number;
    };
}
export interface IUndoable<State> {
    past: State[];
    present: State;
    future: State[];
}
export declare const createTimeMachineNode: <State, Dispatchers>(config: {
    name: string;
    reducers: IReducers;
    actionCreators?: IActionCreators | {
        ActionCreators: IUndoActionCreators;
    } | undefined;
    initialState?: State | undefined;
}) => import("redux-hub").IStateNode<State, Dispatchers & IUndoActionCreators>;
