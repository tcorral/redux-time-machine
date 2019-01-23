
import { Hub, HubModel, INodeApiComplete, IReducers, IStateNode, SetMethod, StateHub } from 'redux-hub';
// @ts-ignore
import undoable, { ActionCreators, ActionTypes, distinctState } from 'redux-undo';
// @ts-ignore
import * as uuidv4 from 'uuid/v4';

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

export class StateHubTimeMachine<State, Dispatchers, model, result> extends
StateHub<State, Dispatchers, Hub, {}> {
    private state: State | undefined;
    public node = (scopeName: string = uuidv4()):
    INodeApiComplete<State, Dispatchers & IUndoActionCreators, model, result> => {
        const hubModel: HubModel = new HubModel(scopeName);
        const executionTrack: { [key in keyof Hub]?: boolean } = {};
        type DispatchersAndUndo = Dispatchers & IUndoActionCreators;

        const create = (): IStateNode<State, DispatchersAndUndo> => {
            if (!executionTrack.actions || !executionTrack.reducers) {
                throw new Error('Unable to create node. Actions and reducers are required.');
            }
            if (!executionTrack.state) {
                hubModel.state({});
            }
            type UndoableState = State & IUndoable<State>;

            const stateNode = hubModel.create<State, DispatchersAndUndo>();
            const originalGetState = stateNode.getState;
            stateNode.getState = (): State => {
                return ((originalGetState.apply(stateNode) as UndoableState).present ||
                originalGetState.apply(stateNode));
            };
            return stateNode;
        };

        const set: SetMethod<State, DispatchersAndUndo, model, result> =
            <method extends Exclude<keyof model, keyof result>>(method: method, data: any, hook: (data: any) => any):
                INodeApiComplete<State, DispatchersAndUndo, model, result  & { [x in method]: model[x] }>  => {
                    (executionTrack as any)[method] = true;

                    if (method === 'state') {
                        this.state = data;
                    }
                    if (method === 'actions') {
                        delete (data as IUndoableActionCreators).ActionCreators;
                        data = {
                            ...data,
                            ...ActionCreators,
                        };
                    }
                    if (method === 'reducers') {
                        if (!executionTrack.state) {
                            throw new Error('Unable to set reducers before setting a initial state.');
                        }
                        const createUndoableReducers = (reducers: IReducers, initialState: State | undefined):
                            IReducers => {
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
                        data = createUndoableReducers(data, this.state);
                    }
                    (hubModel as any)[method](data);
                    return {
                        create,
                        set,
                    };
            };

        return {
            create,
            set,
        };
    }
}
