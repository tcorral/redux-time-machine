import { } from 'jasmine';
import { AnyAction } from 'redux';
import { Hub, IStateNode } from 'redux-hub';

import { IUndoActionCreators, StateHubTimeMachine } from './index';

describe('redux-time-machine', () => {
    describe('createTimeMachineNode', () => {
        interface ITestState { test: string; }
        interface ITestDispatchers { test: any; }
        let timeMachineNode: IStateNode<ITestState, ITestDispatchers & IUndoActionCreators>;

        beforeEach(() => {
            timeMachineNode = new StateHubTimeMachine<ITestState, ITestDispatchers, Hub, {}>()
            .node('createTimeMachineNode')
            .set('actions', {
                test: () => ({
                    type: 'TEST',
                }),
            })
            .set('state', {
                test: 'test',
            })
            .set('reducers', {
                TEST: (state: any, action: AnyAction) => {
                    return {
                        ...state,
                        test: 'test2',
                    };
                },
            })
            .create();
        });

        it('should return "test" as initial test value', (done) => {
            expect(timeMachineNode.getState().test).toEqual('test');
            done();
        });
    });
    describe('dispatching', () => {
        interface ITestState { test: string; }
        interface ITestDispatchers { test: any; }
        let timeMachineNode: IStateNode<ITestState, ITestDispatchers & IUndoActionCreators>;

        beforeEach(() => {
            timeMachineNode = new StateHubTimeMachine<ITestState, ITestDispatchers, Hub, {}>()
            .node('dispatching')
            .set('actions', {
                test: () => ({
                    type: 'TEST',
                }),
            })
            .set('state', {
                test: 'test',
            })
            .set('reducers', {
                TEST: (state: any, action: AnyAction) => {
                    return {
                        ...state,
                        test: 'test2',
                    };
                },
            })
            .create();
        });

        it('should return "test2" as test value on dispatching "test" action', (done) => {
            timeMachineNode.dispatchers.test();
            expect(timeMachineNode.getState().test).toBe('test2');
            done();
        });
    });
    describe('undo', () => {
        interface ITestState { test: string; }
        interface ITestDispatchers { test: any; }
        let timeMachineNode: IStateNode<ITestState, ITestDispatchers & IUndoActionCreators>;

        beforeEach(() => {
            timeMachineNode = new StateHubTimeMachine<ITestState, ITestDispatchers, Hub, {}>()
            .node('undo')
            .set('actions', {
                test: () => ({
                    type: 'TEST',
                }),
            })
            .set('state', {
                test: 'test',
            })
            .set('reducers', {
                TEST: (state: any, action: AnyAction) => {
                    return {
                        ...state,
                        test: 'test2',
                    };
                },
            })
            .create();
        });

        it('undo should set test state to "test"', () => {
            timeMachineNode.dispatchers.test();
            timeMachineNode.dispatchers.undo();
            expect(timeMachineNode.getState().test).toBe('test');
        });
    });
    describe('redo', () => {
        interface ITestState { test: string; }
        interface ITestDispatchers { test: any; }
        let timeMachineNode: IStateNode<ITestState, ITestDispatchers & IUndoActionCreators>;

        beforeEach(() => {
            timeMachineNode = new StateHubTimeMachine<ITestState, ITestDispatchers, Hub, {}>()
            .node('redo')
            .set('actions', {
                test: () => ({
                    type: 'TEST',
                }),
            })
            .set('state', {
                test: 'test',
            })
            .set('reducers', {
                TEST: (state: any, action: AnyAction) => {
                    return {
                        ...state,
                        test: 'test2',
                    };
                },
            })
            .create();
        });

        it('redo should set test state to "test2"', () => {
            timeMachineNode.dispatchers.test();
            timeMachineNode.dispatchers.undo();
            timeMachineNode.dispatchers.redo();
            expect(timeMachineNode.getState().test).toBe('test2');
        });
    });
    describe('jumpToPast index 0', () => {
        interface ITestState { test: string; }
        interface ITestDispatchers { test: any; test2: any; }
        let timeMachineNode: IStateNode<ITestState, ITestDispatchers & IUndoActionCreators>;

        beforeEach(() => {
            timeMachineNode = new StateHubTimeMachine<ITestState, ITestDispatchers, Hub, {}>()
            .node('jumpToPast1')
            .set('actions', {
                test: () => ({
                    type: 'TEST',
                }),
                test2: () => ({
                    type: 'TEST2',
                }),
            })
            .set('state', {
                test: 'test',
            })
            .set('reducers', {
                TEST: (state: any, action: AnyAction) => {
                    return {
                        ...state,
                        test: 'test2',
                    };
                },
                TEST2: (state: any, action: AnyAction) => {
                    return {
                        ...state,
                        test: 'test3',
                    };
                },
            })
            .create();
        });

        it('jumpToPast index 0 should return "test"', () => {
            timeMachineNode.dispatchers.test();
            timeMachineNode.dispatchers.test2();
            timeMachineNode.dispatchers.jumpToPast(0);
            expect(timeMachineNode.getState().test).toBe('test');
        });
    });
    describe('jumpToPast index 1', () => {
        interface ITestState { test: string; }
        interface ITestDispatchers { test: any; test2: any; }
        let timeMachineNode: IStateNode<ITestState, ITestDispatchers & IUndoActionCreators>;

        beforeEach(() => {
            timeMachineNode = new StateHubTimeMachine<ITestState, ITestDispatchers, Hub, {}>()
            .node('jumpToPast2')
            .set('actions', {
                test: () => ({
                    type: 'TEST',
                }),
                test2: () => ({
                    type: 'TEST2',
                }),
            })
            .set('state', {
                test: 'test',
            })
            .set('reducers', {
                TEST: (state: any, action: AnyAction) => {
                    return {
                        ...state,
                        test: 'test2',
                    };
                },
                TEST2: (state: any, action: AnyAction) => {
                    return {
                        ...state,
                        test: 'test3',
                    };
                },
            })
            .create();
        });

        it('jumpToPast index 1 should return "test2"', () => {
            timeMachineNode.dispatchers.test();
            timeMachineNode.dispatchers.test2();
            timeMachineNode.dispatchers.jumpToPast(1);
            expect(timeMachineNode.getState().test).toBe('test2');
        });
    });
    describe('jumpToFuture index 1', () => {
        interface ITestState { test: string; }
        interface ITestDispatchers { test: any; test2: any; }
        let timeMachineNode: IStateNode<ITestState, ITestDispatchers & IUndoActionCreators>;
        beforeEach(() => {
            timeMachineNode = new StateHubTimeMachine<ITestState, ITestDispatchers, Hub, {}>()
            .node('jumpToFuture1')
            .set('actions', {
                test: () => ({
                    type: 'TEST',
                }),
                test2: () => ({
                    type: 'TEST2',
                }),
            })
            .set('state', {
                test: 'test',
            })
            .set('reducers', {
                TEST: (state: any, action: AnyAction) => {
                    return {
                        ...state,
                        test: 'test2',
                    };
                },
                TEST2: (state: any, action: AnyAction) => {
                    return {
                        ...state,
                        test: 'test3',
                    };
                },
            })
            .create();
        });

        it('jumpToFuture index 1 should return "test3"', () => {
            timeMachineNode.dispatchers.test();
            timeMachineNode.dispatchers.test2();
            timeMachineNode.dispatchers.jumpToPast(0);
            timeMachineNode.dispatchers.jumpToFuture(1);
            expect(timeMachineNode.getState().test).toBe('test3');
        });
    });
    describe('jumpToFuture index 2', () => {
        interface ITestState { test: string; }
        interface ITestDispatchers { test: any; test2: any; test3: any; }
        let timeMachineNode: IStateNode<ITestState, ITestDispatchers & IUndoActionCreators>;

        beforeEach(() => {
            timeMachineNode = new StateHubTimeMachine<ITestState, ITestDispatchers, Hub, {}>()
            .node('jumpToFuture2')
            .set('actions', {
                test: () => ({
                    type: 'TEST',
                }),
                test2: () => ({
                    type: 'TEST2',
                }),
                test3: () => ({
                    type: 'TEST3',
                }),
            })
            .set('state', {
                test: 'test',
            })
            .set('reducers', {
                TEST: (state: any, action: AnyAction) => {
                    return {
                        ...state,
                        test: 'test2',
                    };
                },
                TEST2: (state: any, action: AnyAction) => {
                    return {
                        ...state,
                        test: 'test3',
                    };
                },
                TEST3: (state: any, action: AnyAction) => {
                    return {
                        ...state,
                        test: 'test4',
                    };
                },
            })
            .create();
        });

        it('jumpToFuture index 2 should return "test4"', () => {
            timeMachineNode.dispatchers.test();
            timeMachineNode.dispatchers.test2();
            timeMachineNode.dispatchers.test3();
            timeMachineNode.dispatchers.jumpToPast(0);
            timeMachineNode.dispatchers.jumpToFuture(2);
            expect(timeMachineNode.getState().test).toBe('test4');
        });
    });
});
