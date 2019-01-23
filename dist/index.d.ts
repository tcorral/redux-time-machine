import { Hub, INodeApiComplete, StateHub } from 'redux-hub';
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
export declare class StateHubTimeMachine<State, Dispatchers, model, result> extends StateHub<State, Dispatchers, Hub, {}> {
    private state;
    node: (scopeName?: string) => INodeApiComplete<State, Dispatchers & IUndoActionCreators, model, result>;
}
