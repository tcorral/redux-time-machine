import { } from 'jasmine';
import { AnyAction } from 'redux';
import { IStateNode } from 'redux-hub';

import { createTimeMachineNode, IUndoActionCreators } from './index';

describe('redux-time-machine', () => {
    describe('createTimeMachineNode', () => {
        interface ITestState { test: string; }
        interface ITestDispatchers { test: any; }
        let timeMachineNode: IStateNode<ITestState, ITestDispatchers & IUndoActionCreators>;
        const config = {
            actionCreators: {
                test: () => ({
                    type: 'TEST',
                }),
            },
            initialState: {
                test: 'test',
            },
            name: 'createTimeMachineNode',
            reducers: {
                TEST: (state: any, action: AnyAction) => {
                    return {
                        ...state,
                        test: 'test2',
                    };
                },
            },
        };
        beforeEach(() => {
            timeMachineNode = createTimeMachineNode<ITestState, ITestDispatchers>(config);
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
        const config = {
            actionCreators: {
                test: () => ({
                    type: 'TEST',
                }),
            },
            initialState: {
                test: 'test',
            },
            name: 'dispatching',
            reducers: {
                TEST: (state: any, action: AnyAction) => {
                    return {
                        ...state,
                        test: 'test2',
                    };
                },
            },
        };
        beforeEach(() => {
            timeMachineNode = createTimeMachineNode<ITestState, ITestDispatchers>(config);
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
        const config = {
            actionCreators: {
                test: () => ({
                    type: 'TEST',
                }),
            },
            initialState: {
                test: 'test',
            },
            name: 'undo',
            reducers: {
                TEST: (state: any, action: AnyAction) => {
                    return {
                        ...state,
                        test: 'test2',
                    };
                },
            },
        };
        beforeEach(() => {
            timeMachineNode = createTimeMachineNode<ITestState, ITestDispatchers>(config);
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
        const config = {
            actionCreators: {
                test: () => ({
                    type: 'TEST',
                }),
            },
            initialState: {
                test: 'test',
            },
            name: 'redo',
            reducers: {
                TEST: (state: any, action: AnyAction) => {
                    return {
                        ...state,
                        test: 'test2',
                    };
                },
            },
        };
        beforeEach(() => {
            timeMachineNode = createTimeMachineNode<ITestState, ITestDispatchers>(config);
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
        const config = {
            actionCreators: {
                test: () => ({
                    type: 'TEST',
                }),
                test2: () => ({
                    type: 'TEST2',
                }),
            },
            initialState: {
                test: 'test',
            },
            name: 'jumpToPast1',
            reducers: {
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
            },
        };
        beforeEach(() => {
            timeMachineNode = createTimeMachineNode<ITestState, ITestDispatchers>(config);
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
        const config = {
            actionCreators: {
                test: () => ({
                    type: 'TEST',
                }),
                test2: () => ({
                    type: 'TEST2',
                }),
            },
            initialState: {
                test: 'test',
            },
            name: 'jumpToPast2',
            reducers: {
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
            },
        };
        beforeEach(() => {
            timeMachineNode = createTimeMachineNode<ITestState, ITestDispatchers>(config);
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
        const config = {
            actionCreators: {
                test: () => ({
                    type: 'TEST',
                }),
                test2: () => ({
                    type: 'TEST2',
                }),
            },
            initialState: {
                test: 'test',
            },
            name: 'jumpToFuture1',
            reducers: {
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
            },
        };
        beforeEach(() => {
            timeMachineNode = createTimeMachineNode<ITestState, ITestDispatchers>(config);
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
        const config = {
            actionCreators: {
                test: () => ({
                    type: 'TEST',
                }),
                test2: () => ({
                    type: 'TEST2',
                }),
                test3: () => ({
                    type: 'TEST3',
                }),
            },
            initialState: {
                test: 'test',
            },
            name: 'jumpToFuture2',
            reducers: {
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
            },
        };
        beforeEach(() => {
            timeMachineNode = createTimeMachineNode<ITestState, ITestDispatchers>(config);
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
