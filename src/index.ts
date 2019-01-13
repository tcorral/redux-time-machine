import { IActionCreators, IReducers, stateHub  } from 'redux-hub';
// @ts-ignore
import undoable, { ActionCreators, ActionTypes, distinctState } from 'redux-undo';

export interface IUndoActionCreators {
    undo: () => { type: ActionTypes.UNDO };
    redo: () => { type: ActionTypes.REDO };
    jumpToFuture: (index: number) => { type: ActionTypes.JUMP_TO_FUTURE, index: number };
    jumpToPast: (index: number) => { type: ActionTypes.JUMP_TO_PAST, index: number };
}
export interface IUndoable<State> {
    past: State[];
    present: State;
    future: State[];
}
interface IUndoableActionCreators {
    ActionCreators: IUndoActionCreators;
}
export const createTimeMachineNode = <State, Dispatchers>(config: {
    name: string,
    reducers: IReducers,
    actionCreators?: IActionCreators | { ActionCreators: IUndoActionCreators },
    initialState?: State,
}) => {
    if (config.actionCreators) {
        delete (config.actionCreators as IUndoableActionCreators).ActionCreators;
        config.actionCreators = {
            ...config.actionCreators,
            ...ActionCreators,
        };
    }
    const createUndoableReducers = (reducers: IReducers, initialState: State | undefined): IReducers => {
        const undoableReducers: IReducers = {};
        for (const key in reducers) {
            if (reducers.hasOwnProperty(key)) {
                undoableReducers[key] = undoable(reducers[key], {
                    filter: distinctState(),
                    initialState,
                });
            }
        }
        for (const key in ActionTypes) {
            if (ActionTypes.hasOwnProperty(key)) {
                const actionType = ActionTypes[key];
                undoableReducers[actionType] = undoable((state: State) => state, {
                    filter: distinctState(),
                    initialState,
                });
            }
        }
        return undoableReducers;
    };
    config.reducers = createUndoableReducers(config.reducers, config.initialState);
    const stateNode = stateHub.createNode<State, Dispatchers & IUndoActionCreators>(config);

    type UndoableState = State & IUndoable<State>;

    const originalGetState = stateNode.getState;

    stateNode.getState = (): State => {
        return ((originalGetState.apply(stateNode) as UndoableState).present || originalGetState.apply(stateNode));
    };
    return stateNode;
};
